export type tokenType = {
  nftAddress: string;
  tokenId: string;
  tokenURI: string;
};
export type IPFSResponseType = {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
};
export type ResType = {
  data: string;
};
export type attributeType = {
  display_type?: string;
  trait_type: string;
  value: number | string;
};
export type nftType = {
  image: string;
  name: string;
  description: string;
  attributes?: attributeType[];
};
export enum LocalStorageEnum {
  ACTIVE_ADDRESS = "ACTIVE_ADDRESS",
  ADDRESSES = "ADDRESSES",
  THEME = "THEME",
}
export enum CardEnum {
  OWNER = "OWNER",
  LISTED = "LISTED",
}
