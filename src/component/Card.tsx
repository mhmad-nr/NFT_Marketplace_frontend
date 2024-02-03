import { convertStringToEther, getFormatPrice } from "../helper";
import { tokenListedType } from "../types";
import * as ethers from "ethers";

export const Card = ({
  id,
  nftAddress,
  price,
  seller,
  tokenId,
}: tokenListedType) => {
  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl">
      <figure>
        <img
          src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="text-base font-semibold flex items-end gap-x-1">NFT NAME</h2>
        <h2 className="text-xs flex justify-end items-end gap-x-1">
          {convertStringToEther(price)}
          <span className="text-xs">ETH</span>
        </h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};
