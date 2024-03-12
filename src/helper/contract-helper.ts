import * as ethers from "ethers";
import {
  abi as NftMarketplaceABI,
  address as NftMarketplaceAddress,
} from "../utils/contracts/NftMarketplace.json";
import {
  abi as NFTABI,
  address as NFTAddress,
} from "../utils/contracts/NFT.json";

export const isValidAddress = (address: string): boolean => {
  const isAddress = ethers.isAddress(address);
  if (!isAddress) return false;
  const isZero = ethers.ZeroAddress == address;
  if (isZero) return false;
  return true;
};
type TypeContractProvider = {
  signerAddress: string;
  contractAddress: string;
  contractABI: any[];
};

export const contractProvider = async ({
  signerAddress,
  contractAddress,
  contractABI,
}: TypeContractProvider) => {
  const { ethereum } = window;
  const provider = new ethers.BrowserProvider(ethereum);
  const signer = await provider.getSigner(signerAddress);
  const contract = new ethers.Contract(contractAddress, contractABI, signer);
  return { signer, contract, provider };
};
export const NftMarketplaceContract = async (signerAddress: string) => {
  return await contractProvider({
    contractABI: NftMarketplaceABI,
    contractAddress: NftMarketplaceAddress,
    signerAddress,
  });
};
export const NFTContract = async (
  signerAddress: string,
  contractAddress = NFTAddress
) => {
  return await contractProvider({
    contractABI: NFTABI,
    contractAddress,
    signerAddress,
  });
};

export const listenForEmitEvent = async (
  contract: ethers.Contract,
  eventName: string
): Promise<any> => {
  return new Promise<any>((resolve) => {
    contract.on(eventName, resolve);
  });
};

export const listenForTransactionMine = async (
  transactionResponse: any,
  provider: ethers.BrowserProvider
): Promise<any> => {
  return new Promise(() => {
    provider.once(transactionResponse.hash, (transactionReceipt) => {
      console.log(`Mined in ${transactionReceipt.blockHash} successfully`);
    });
  });
};
