import { useEffect, useState } from "react";
import { nftType, tokenListedType, tokenType } from "../../types";
import { Link } from "react-router-dom";
import { NFTContract, NftMarketplaceContract } from "../../helper";
import { useStore } from "../../hook";
import * as ethers from "ethers";

type stateType = {} & nftType;
export const Marketplace = ({
  nftAddress,
  tokenURI,
  tokenId,
  price,
  seller,
}: tokenListedType) => {
  const [state, setState] = useState<stateType>({
    image: "",
    description: "",
    name: "",
  });
  const { store } = useStore();
  const { activeAccount } = store;
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!tokenURI) {
      getURI();
    } else {
      if (typeof tokenURI == "string") {
        getURIData(tokenURI);
      }
    }
  }, []);

  const getURI = async () => {
    setIsLoading(true);
    const { contract } = await NFTContract(activeAccount, nftAddress);
    const URI: string = await contract.tokenURI(tokenId);
    console.log(URI);

    getURIData(URI);
  };
  const getURIData = async (URI: string) => {
    try {
      setIsLoading(true);
      const res = await (await fetch(URI)).json();
      setState(res);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const buyNFT = async () => {
    const { contract, provider, signer } = await NftMarketplaceContract(
      store.activeAccount
    );

    const tx = await contract.buyItem(nftAddress, tokenId, {
      value: price,
      gasLimit: 500000,
    });
    await tx.wait(1);
  };
  if (isLoading) {
    return (
      <div className="card card-compact w-80 bg-base-100 shadow-xl flex flex-col gap-4">
        <div className="skeleton h-[15rem] w-full"></div>
        <div className="skeleton h-8 w-1/3"></div>
        <div className="w-full flex justify-end items-end gap-x-1">
          <div className="skeleton h-6 w-14"></div>
          <span className="text-xs">ETH</span>
        </div>
        <div className="skeleton h-16 w-full"></div>
        <div className="w-full flex justify-end">
          <div className="skeleton h-12 w-20 "></div>
        </div>
      </div>
    );
  }
  const isOwnerByYou = seller == activeAccount;
  return (
    <div className="card card-compact w-80 bg-base-100 shadow-xl">
      <figure>
        <img className="max-h-[15rem]" src={state.image} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="text-base font-semibold flex items-end gap-x-1">
          {state.name}
        </h2>
        <div className="w-full flex flex-col items-start gap-x-2 mt-2">
          <h2 className="font-light">Seller: </h2>
          {isLoading ? (
            <>
              <div className="skeleton w-14 h-5"></div>
            </>
          ) : (
            <>
              <span className="border rounded-xl text-xs font-semibold text-C72 bg-base-100 px-1 ">
                {isOwnerByYou ? "You" : seller}
              </span>
            </>
          )}
        </div>

        <h2 className="text-xs flex justify-end items-end gap-x-1">
          {false ? (
            <>
              <div className="skeleton h-6 w-14"></div>
            </>
          ) : (
            <>
              <span className="text-xl">
                {price && ethers.formatEther(price)}
              </span>
            </>
          )}
          <span className="text-xs">ETH</span>
        </h2>
        <p>{state.description}</p>
        <div className="card-actions justify-between">
          <Link
            className="btn btn-primary"
            to={`/tokens/${nftAddress}/${tokenId}`}
          >
            See
          </Link>
          {!isOwnerByYou && (
            <button onClick={buyNFT} className="btn">
              Buy
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
