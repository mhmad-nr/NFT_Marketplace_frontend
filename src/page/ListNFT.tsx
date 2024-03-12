import React, { useEffect, useState } from "react";
import { activeItemsType, itemListedsType } from "../types";
import { GET_TOKENS_LISTED } from "../graphql";
import { useQuery } from "@apollo/client";
import * as ethers from "ethers";
import { useAction, useStore } from "../hook";
import { NFTContract, NftMarketplaceContract } from "../helper";
import { address as NFTAddress } from "../utils/contracts/NFT.json";
import { address as NFTMarketplaceAddress } from "../utils/contracts/NftMarketplace.json";

console.log(ethers);
const PRICE = ethers.parseEther("0.000000000000000015");

type stateType = {
  itemListeds: activeItemsType;
};
const ListNFT = () => {
  const [state, setState] = useState({});
  const { store } = useStore();

  const connectWallet = async () => {
    // console.log("connect");
  };
  useEffect(() => {
    connectWallet();
  }, []);

  const listNFT = async () => {
    const { contract: basicNft } = await NFTContract(store.activeAccount);
    const { contract: nftMarketplace } = await NftMarketplaceContract(
      store.activeAccount
    );

    const tokenId = await basicNft.getId();

    console.log("Approving NFT...");
    console.log(
      "nftMarketplace.address",
      nftMarketplace.target,
      "tokenId",
      tokenId
    );

    const approvalTx = await basicNft.approve(
      nftMarketplace.target,
      ethers.toNumber(tokenId) - 1
    );
    await approvalTx.wait(1);
    console.log("Listing NFT...");
    const tx = await nftMarketplace.listNFT(
      basicNft.target,
      ethers.toNumber(tokenId) - 1,
      PRICE
    );
    await tx.wait(1);
    console.log("NFT Listed!");

    // const tx = await nftMarketplace.buyItem(basicNft.target, ethers.toNumber(tokenId) - 1, {
    //   value: PRICE,
    //   gasLimit: 500000
    // })
  };

  return (
    <>
      <button onClick={listNFT} className="btn btn-accent">
        list
      </button>
      <div> NFT</div>
    </>
  );
};

export default ListNFT;
