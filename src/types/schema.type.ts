import { tokenType } from ".";

export type tokenListedType = tokenType & {
  price: string;
  seller: string;
};

export type tokenBoughtType = tokenListedType & {
  buyer: string;
};
export type activeItemType = tokenBoughtType;


export type itemListedsType = tokenListedType[];
export type tokenBoughtsType = tokenBoughtType[];
export type activeItemsType = activeItemType[];
