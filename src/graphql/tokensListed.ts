import { gql } from "@apollo/client"

export const GET_TOKENS_LISTED = gql`
    {
        itemListeds {
            id
            nftAddress
            seller
            tokenId
            price
        }
    }
`
