import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { get } from "../service/connection";
import { NFTContract, NftMarketplaceContract, isValidAddress } from "../helper";
import { useAction, useStore } from "../hook";
import { nftType } from "../types";
import * as ethers from "ethers";
import { ReactComponent as HamburgerSvg } from "../assets/icon/hamburger.svg";
import { ReactComponent as UserSvg } from "../assets/icon/user.svg";
import Attribute from "../component/Attribute";
import { Modal } from "../component/Modal";
import { toast } from "react-toastify";
type stateType = {
  tokenOwner: string;
  price: string;
} & nftType;
const Token = () => {
  const { contractAddress, tokenId } = useParams();
  const { store } = useStore();
  const { activeAccount } = store;

  const [state, setState] = useState<stateType>({
    description: "",
    image: "",
    name: "",
    tokenOwner: "",
    attributes: [],
    price: "0",
  });
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getData();
  }, []);
  const modalRef = useRef<HTMLDialogElement>(null);
  const getData = async () => {
    if (!contractAddress || !tokenId) return;
    setIsLoading(true);
    try {
      const { contract } = await NFTContract(activeAccount, contractAddress);

      const tokenOwner = (await contract.ownerOf(tokenId)).toLocaleLowerCase();
      const URI = await contract.tokenURI(tokenId);

      const res = await get<nftType>(URI);

      const data = {
        ...res.data,
        tokenOwner,
      };
      setState({ ...state, ...data });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const { setMessageLoading, setNotLoading } = useAction();
  const List = async () => {
    if (!contractAddress || !tokenId) return;

    try {
      modalRef.current?.close();
      setMessageLoading("Waiting for token to be approved");
      const { contract: nftMarketplace } = await NftMarketplaceContract(
        store.activeAccount
      );
      const { contract: NFT } = await NFTContract(
        activeAccount,
        contractAddress
      );

      const approvalTx = await NFT.approve(
        nftMarketplace.target,
        parseInt(tokenId)
      );
      setMessageLoading("Waiting for token to be approved (mining...)");

      await approvalTx.wait(1);
      setMessageLoading("Waiting for token to be Listed");
      const PRICE = ethers.parseUnits(state.price);
      const tx = await nftMarketplace.listNFT(NFT.target, tokenId, PRICE);
      setMessageLoading("Waiting for token to be Listed (mining...)");
      await tx.wait(1);
      console.log("NFT Listed!");
    } catch (error) {
      console.log(error);
    } finally {
      setNotLoading();
    }
  };
  const onList = async () => {
    const { contract } = await NftMarketplaceContract(store.activeAccount);
    const res = await contract.getListing(contractAddress, tokenId);

    const price = ethers.formatEther(res[0]);
    const owner = isValidAddress(res[1]);
    if (price && owner) return toast("This Has been already listed")

    modalRef.current?.showModal();
  };
  const isOwnerByYou = state.tokenOwner == activeAccount;
  return (
    <>
      <Modal ref={modalRef}>
        <div>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Price:</span>
            </div>
            <div className="w-full flex items-end gap-x-2">
              <input
                value={state.price}
                step={0.001}
                type="number"
                onChange={(e) =>
                  setState({ ...state, price: e.currentTarget.value })
                }
                placeholder="0.1"
                className="appearance-none input input-bordered w-full"
              />
              <span className="text-sm text-white">ETH</span>
            </div>
          </label>
          <div className="w-full flex justify-center mt-4">
            <button onClick={List} className="btn btn-wide">
              List
            </button>
          </div>
        </div>
      </Modal>
      <div className="flex-1">
        <div className="flex w-full pt-8 px-6">
          <div className="grid flex-1 card bg-base-300 rounded-box overflow-hidden p-6">
            <div className="w-full flex  justify-center">
              {isLoading ? (
                <>
                  <div className="skeleton w-full h-72"></div>
                </>
              ) : (
                <>
                  <img src={state.image} className="max-h-72" />
                </>
              )}
            </div>
            <div className="mt-10">
              <div className="w-full flex gap-x-2 items-center">
                <HamburgerSvg className="text-w" />
                <h2 className="text-xl font-bold">Properties</h2>
              </div>
              <div className="divider divider-vertical h-0.5 bg-BGwhite"></div>
            </div>

            {!isLoading && state.attributes == undefined && (
              <div className="w-full h-20 rounded-3xl flex justify-center items-center border border-dashed border-white">
                <h2>Has no Properties</h2>
              </div>
            )}
            <div className="grid grid-cols-4 gap-2">
              {isLoading ? (
                <>
                  <div className="skeleton h-20"></div>
                  <div className="skeleton h-20"></div>
                  <div className="skeleton h-20"></div>
                  <div className="skeleton h-20"></div>
                </>
              ) : (
                state.attributes?.map((values) => (
                  <>
                    <div className="bg-base-100 rounded-xl border border-White3 relative p-2  overflow-hidden pt-8">
                      <Attribute {...values} />
                    </div>
                  </>
                ))
              )}
            </div>
          </div>
          <div className="divider divider-horizontal"></div>
          <div className="grid w-[500px] p-6 bg-base-300 rounded-box overflow-hidden relative">
            <div className="">
              <div>
                {isLoading ? (
                  <>
                    <div className="skeleton w-52 h-8"></div>
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl font-semibold">{state.name}</h2>
                  </>
                )}
              </div>
              <div className="w-full flex items-center gap-x-2 mt-2">
                <UserSvg />
                <h2 className="font-light">Owned by: </h2>
                {isLoading ? (
                  <>
                    <div className="skeleton w-72 h-5"></div>
                  </>
                ) : (
                  <>
                    <span className="border rounded-xl text-xs font-semibold text-C72 bg-base-100 pb-0.5 px-4 ">
                      {isOwnerByYou ? "You" : state.tokenOwner}
                    </span>
                  </>
                )}
              </div>
              <div className="mt-6">
                {isLoading ? (
                  <>
                    <div className="skeleton w-full h-40"></div>
                  </>
                ) : (
                  <>
                    <p className="text-xs">{state.description}</p>
                  </>
                )}
              </div>
            </div>
            {isOwnerByYou && !isLoading && (
              <div className="w-full flex flex-col gap-y-4 items-center absolute bottom-4 left-0">
                <h2>List your NFT in marketplace</h2>
                <button onClick={onList} className="btn btn-wide">
                  List
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Token;
