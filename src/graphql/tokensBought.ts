import { gql } from "@apollo/client"

export const GET_TOKENS_BOUGHT = gql`
    {
        itemBoughts {
            id
            buyer
            nftAddress
            tokenId
            price
        }
    }
`
