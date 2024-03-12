import { tokenBoughtsType } from '../types'
import { GET_TOKENS_BOUGHT } from '../graphql'
import { useQuery } from '@apollo/client'
import * as ethers from "ethers"
import { useAction, useStore } from '../hook'
import { NftMarketplaceContract } from '../helper'
import { address as NFTAddress } from "../utils/contracts/NFT.json"


console.log(ethers);
const PRICE = ethers.parseEther("0.000000000000000015")

type stateType = {
  itemBoughts: tokenBoughtsType
}
const Bought = () => {


  const { initAccounts } = useAction()
  const { store } = useStore()

  const { loading, error, data } = useQuery<stateType>(GET_TOKENS_BOUGHT)


  const itemBoughts = data?.itemBoughts
  if (!itemBoughts) return
  console.log(itemBoughts);



  const boughtNFT = async (tokenId: number) => {

    const { contract, provider, signer } = await NftMarketplaceContract(store.activeAccount)
    const tx = await contract.buyItem(NFTAddress, tokenId - 1, {
      value: PRICE,
      gasLimit: 500000
    })
    await tx.wait(1)

    // const tx = await nftMarketplace.buyItem(basicNft.target, ethers.toNumber(tokenId) - 1, {
    //   value: PRICE,
    //   gasLimit: 500000
    // })
  }

  return (
    <>
      {
        itemBoughts.map((item) => <>
          <div className='flex items-center gap-x-4'>
            <button onClick={() => boughtNFT(parseInt(item.tokenId))} className="btn btn-secondary">{item.tokenId}</button>
            <p>{item.id}</p>
          </div>
        </>)
      }
    </>
  )
}

export default Bought