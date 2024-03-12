import React, { useEffect, useState } from 'react'
import { itemListedsType } from '../types'
import { GET_TOKENS_LISTED } from '../graphql'
import { useQuery } from '@apollo/client'
import * as ethers from "ethers"
import { useAction, useStore } from '../hook'
import { NFTContract } from '../helper'
import { address as NFTAddress } from "../utils/contracts/NFT.json"


console.log(ethers);
const PRICE = ethers.parseEther("0.000000000000000015")

type stateType = {
  itemListeds: itemListedsType
}
const NFT = () => {

  const [state, setState] = useState({
  })
  const { store } = useStore()

  const connectWallet = async () => {

    // console.log("connect");

  }
  useEffect(() => {
    connectWallet()
  }, [])




  const mintNFT = async () => {

    const { contract, provider, signer } = await NFTContract(store.activeAccount)
    const mintTx = await contract.mintNft()

    await mintTx.wait(1)
    
    alert("NFT has minted successfully")
    
    // const tx = await nftMarketplace.buyItem(basicNft.target, ethers.toNumber(tokenId) - 1, {
    //   value: PRICE,
    //   gasLimit: 500000
    // })
  }

  return (
    <>

      <button onClick={mintNFT}
        className="btn btn-accent">mint</button>
      < div > NFT</div >
    </>
  )
}

export default NFT