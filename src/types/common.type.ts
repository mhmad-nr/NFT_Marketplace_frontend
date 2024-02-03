export type tokenType = {
  id: string;
  nftAddress: string;
  tokenId: string;
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
  value: number;
};
