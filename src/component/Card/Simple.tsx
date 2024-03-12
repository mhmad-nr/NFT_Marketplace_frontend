import { useEffect, useState } from "react";
import { nftType, tokenListedType, tokenType } from "../../types";
import { Link } from "react-router-dom";
import { useStore } from "../../hook";
import * as ethers from "ethers";
type stateType = {} & nftType;
export const Simple = ({ nftAddress, tokenId, tokenURI }: tokenType) => {
  const [state, setState] = useState<stateType>({
    image: "",
    description: "",
    name: "",
  });
  const { store } = useStore();
  const { activeAccount } = store;
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getURIData();
  }, []);

  const getURIData = async () => {
    try {
      setIsLoading(true);
      const res = await (await fetch(tokenURI)).json();
      setState(res);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
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
  return (
    <div className="card card-compact w-80 bg-base-100 shadow-xl">
      <figure>
        <img className="max-h-[15rem]" src={state.image} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="text-base font-semibold flex items-end gap-x-1">
          {state.name}
        </h2>
        <p>{state.description}</p>
        <div className="card-actions justify-end">
          <Link
            className="btn btn-primary"
            to={`/tokens/${nftAddress}/${tokenId}`}
          >
            See
          </Link>
        </div>
      </div>
    </div>
  );
};
