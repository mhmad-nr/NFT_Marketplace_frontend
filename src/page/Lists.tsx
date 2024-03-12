import React, { useEffect, useState } from "react";
import { activeItemsType, itemListedsType } from "../types";
import { GET_ACTIVE_ITEMS, GET_TOKENS_LISTED } from "../graphql";
import { useQuery } from "@apollo/client";
import * as ethers from "ethers";
import { useAction, useStore } from "../hook";
import { NftMarketplaceContract, getTokenListes } from "../helper";
import { address as NFTAddress } from "../utils/contracts/NFT.json";
import { Card } from "../component";

const PRICE = ethers.parseEther("0.000000000000000015");

type stateType = {
  activeItems: activeItemsType;
};
const Lists = () => {
  const [state, setState] = useState({});
  const { initAccounts } = useAction();
  const { store } = useStore();

  const { loading, error, data } = useQuery<stateType>(GET_ACTIVE_ITEMS);

  const activeItems = data?.activeItems;
  if (!activeItems) return;

  return (
    <>
      {getTokenListes(activeItems).map((item) => (
        <>
          <Card {...item} />
        </>
      ))}
    </>
  );
};

export default Lists;
