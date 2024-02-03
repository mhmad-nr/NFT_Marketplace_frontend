import { useState } from "react";
import { UploadImage } from "./UploadImage";
import { NameDes } from "./NameDes";
import { ReviewMint } from "./ReviewMint";
import { attributeType } from "../../types";
import { IPFS } from "../../service/api-ipfs";
import { useAction, useStore } from "../../hooks";
import { NFTContract } from "../../helper";
import { Done } from "./Done";

enum steps {
  UPLOAD_IMAGE,
  ENTER_NAME,
  REWIEW,
  DONE,
}
type stateType = {
  currentSteps: steps;
};

type nftType = {
  image: string;
  name: string;
  description: string;

  attributes?: attributeType[];
};

const CreateNFT = () => {
  const [state, setState] = useState<stateType>({
    currentSteps: steps.DONE,
  });
  const [NFT, setNFT] = useState<nftType>({
    image: "",
    description: "",
    name: "",
  });
  const { setMessageLoading, setNotLoading } = useAction();
  const { store } = useStore();

  const onUpload = (image: string) => {
    setState({ ...state, currentSteps: steps.ENTER_NAME });
    setNFT({ ...NFT, image });
  };
  const onNameDes = (name: string, description: string) => {
    setState({ ...state, currentSteps: steps.REWIEW });
    setNFT({ ...NFT, name, description });
  };

  const saveMetaData = async (): Promise<string> => {
    const { data } = await IPFS().uploadJSON(NFT);
    return data;
  };
  const onMint = async () => {
    setMessageLoading("Uploading to IPFS");
    try {
      const URI = await saveMetaData();
      // mint NFT
      console.log(store.activeAccount);

      const { contract } = await NFTContract(store.activeAccount);
      const mintTx = await contract.mintNft(URI);

      await mintTx.wait(1);
    } catch (error) {
      console.log(error);
    } finally {
    }
    setNotLoading();
  };
  const step = ["Upload Image", "Name & Description", "Review & Mint", "Done"];
  return (
    <div className="w-full h-full relative">
      <div className="absolute top-1/2 -translate-y-1/2 left-8">
        <ul className="steps steps-vertical">
          {step.map((item, index) => {
            return (
              <li
                key={item}
                className={`step text-sm ${
                  state.currentSteps >= index
                    ? "step-primary text-primary font-bold"
                    : "font-light"
                }`}
              >
                {item}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="mt-10 h-full">
        <div className="w-full h-full flex justify-center">
          <div className="w-[650px] h-full pb-12 flex flex-col overflow-hidden ">
            {state.currentSteps == steps.UPLOAD_IMAGE && (
              <UploadImage IPFSURI={NFT.image} onUpload={onUpload} />
            )}
            {state.currentSteps == steps.ENTER_NAME && (
              <NameDes
                nftName={NFT.name}
                nftDescription={NFT.description}
                onBack={() =>
                  setState({ ...state, currentSteps: steps.UPLOAD_IMAGE })
                }
                onNameDes={onNameDes}
              />
            )}
            {state.currentSteps == steps.REWIEW && (
              <ReviewMint
                {...NFT}
                onBack={() =>
                  setState({ ...state, currentSteps: steps.ENTER_NAME })
                }
                onMint={onMint}
              />
            )}
            {state.currentSteps == steps.DONE && <Done />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateNFT;
