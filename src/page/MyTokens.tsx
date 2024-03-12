import { useEffect, useState } from "react";
import nftBackground from "../assets/img/nft.jpg";
import { tokenType } from "../types";
import { NFTContract } from "../helper";
import { useAction, useStore } from "../hook";
import * as ethers from "ethers";
import { Link } from "react-router-dom";
import { Card } from "../component";

type contactType = {
  address: string;
  tokens: tokenType[];
};

type stateType = {
  sections: contactType[];
};
const MyTokens = () => {
  const [state, setState] = useState<stateType>({
    sections: [
      {
        address: "0xff80Ee2d94999a51cB37c64BE31E2bf29ADbd2Ce",
        tokens: [],
      },
    ],
  });
  const { store } = useStore();
  const { setMessageLoading, setNotLoading } = useAction();
  useEffect(() => {
    // fun();
    getTokens("0xff80Ee2d94999a51cB37c64BE31E2bf29ADbd2Ce");
  }, [store.activeAccount]);

  // const {} = useMemo(() =>{
  // } , [])

  const address = store.activeAccount;
  const getTokens = async (contractAddress: string) => {
    try {
      const { contract } = await NFTContract(address, contractAddress);

      setMessageLoading("Loading data from contract ");
      const balance = await contract.balanceOf(address);

      const data: tokenType[] = [];
      for (let i = 0; i < ethers.toNumber(balance); i++) {
        const tokenId = await contract.tokenOfOwnerByIndex(address, i);
        const URI: string = await contract.tokenURI(tokenId);
        const newToken: tokenType = {
          tokenURI: URI,
          nftAddress: contractAddress,
          tokenId: ethers.toNumber(tokenId).toString(),
        };
        data.push(newToken);
      }

      const newSections: contactType[] = state.sections.map(
        (section): contactType => {
          if (section.address == contractAddress) {
            return {
              address: section.address,
              tokens: data,
            };
          }
          return section;
        }
      );
      console.log(newSections);
      
      setState({ sections: newSections });
      setNotLoading();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 min-h-screen
    
    
    ">
      {state.sections.map((section) => {
        return (
          <>
            <div>
              <h2>Section</h2>
              <div className="w-full gap-x-4 items-center flex">
                {section.tokens.map((token) => {
                  console.log(token);

                  return (
                    <>
                      <Card.Simple  {...token}


                      // price={token.price}
                      />
                    </>
                  );
                })}
                <div className="card w-80 bg-base-100 shadow-xl image-full">
                  <figure>
                    <img src={nftBackground} alt="Shoes" />
                  </figure>
                  <div className="card-body justify-center items-center">
                    <Link className="btn btn-outline" to="/createnft">
                      Mint NEW!
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default MyTokens;
