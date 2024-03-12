import React, { useEffect, useState } from "react";
import { itemListedsType } from "../types";
import { GET_TOKENS_LISTED } from "../graphql";
import { useQuery } from "@apollo/client";
import * as ethers from "ethers";
import { useAction, useStore } from "../hook";
import { NftMarketplaceContract } from "../helper";
import { address as NFTAddress } from "../utils/contracts/NFT.json";

console.log(ethers);
const PRICE = ethers.parseEther("0.000000000000000015");

type stateType = {
  itemListeds: itemListedsType;
};
const TokenListed = () => {
  const [state, setState] = useState({});
  const { initAccounts } = useAction();
  const { store } = useStore();

  const { loading, error, data } = useQuery<stateType>(GET_TOKENS_LISTED);

  const itemListeds = data?.itemListeds;
  if (!itemListeds) return;
  console.log(itemListeds);

  const boughtNFT = async (tokenId: number) => {
    console.log(tokenId);
    const { contract, provider, signer } = await NftMarketplaceContract(
      store.activeAccount
    );
    const tx = await contract.buyItem(NFTAddress, tokenId, {
      value: PRICE,
      gasLimit: 500000,
    });
    await tx.wait(1);

    // const tx = await nftMarketplace.buyItem(basicNft.target, ethers.toNumber(tokenId) - 1, {
    //   value: PRICE,
    //   gasLimit: 500000
    // })
  };

  return (
    <>
      {itemListeds.map((item) => (
        <>
          <div className="flex items-center gap-x-4">
            <button
              onClick={() => boughtNFT(parseInt(item.tokenId))}
              className="btn btn-secondary"
            >
              {item.tokenId}
            </button>
            <p>{item.id}</p>
          </div>
        </>
      ))}
    </>
  );
};

export default TokenListed;
