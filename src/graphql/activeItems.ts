import { gql } from "@apollo/client";

export const GET_ACTIVE_ITEMS = gql`
  {
    activeItems {
      id
      buyer
      seller
      nftAddress
      price
      tokenId
    }
  }
`;
