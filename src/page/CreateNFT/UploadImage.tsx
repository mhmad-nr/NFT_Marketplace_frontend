import { useRef, useState } from "react";
import selectImage from "../../assets/img/nft.jpg";

import { IPFS } from "../../service/api-ipfs";
import { useAction } from "../../hook";
type propsType = {
  IPFSURI: string;
  onUpload: (uri: string) => void;
};
export const UploadImage = ({ onUpload, IPFSURI }: propsType) => {
  console.log(IPFSURI);

  const [state, setState] = useState({
    isAi: false,
    imgUrl: IPFSURI.length != 0 ? IPFSURI : selectImage,
    image: new File([""], ""),
  });
  console.log(state.imgUrl);

  const fileRef = useRef<HTMLInputElement>(null);
  const { setMessageLoading, setNotLoading } = useAction();
  const selectFile = () => {
    fileRef.current?.click();
  };

  const uploadImg = async () => {
    if (state.imgUrl == IPFSURI && state.imgUrl.length != 0) {
      onUpload(IPFSURI);
      return;
    }

    setMessageLoading("Uploading to IPFS");
    try {
      const { data } = await IPFS().uploadFile(state.image);
      console.log(data);
      onUpload(data);
    } catch (error) {
      console.log(error);
    } finally {
      setNotLoading();
    }
  };

  const isImageExist = state.image.name.length != 0 || IPFSURI.length != 0;
  console.log(isImageExist);

  return (
    <>
      <div role="tablist" className="tabs tabs-lifted tabs-lg">
        <a
          onClick={() => setState({ ...state, isAi: false })}
          role="tab"
          className={`tab ${
            !state.isAi ? "tab-active !bg-base-200" : ""
          }`}
        >
          Select Image
        </a>
        <a
          onClick={() => setState({ ...state, isAi: true })}
          role="tab"
          className={`tab ${
            state.isAi ? "tab-active !bg-base-200" : ""
          }`}
        >
          AI Gen
        </a>
      </div>
      <div className="border flex-1 border-t-0 bg-base-200 px-12 pb-8 border-base-300 pt-12 relative overflow-hidden">
        <div className="w-full flex h-full justify-between flex-col items-center">
          {state.isAi ? (
            <div className="w-full">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">
                    Please describe the shape of your NFT.
                  </span>
                </div>
                <textarea
                  className="textarea textarea-bordered h-24"
                  placeholder="Your Prompt"
                ></textarea>
                <div className="label"></div>
              </label>
            </div>
          ) : (
            <div className="file">
              <div className="bg-white overflow-hidden relative bg-opacity-15 w-56 h-56 rounded-full flex items-center justify-center ">
                <input
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files;
                    if (file) {
                      setState({
                        ...state,
                        imgUrl: URL.createObjectURL(file[0]),
                        image: file[0],
                      });
                    }
                  }}
                  ref={fileRef}
                  type="file"
                  name="image"
                />
                <img
                  src={!isImageExist ? selectImage : state.imgUrl}
                  className="w-full h-full grayscale-[0.8]"
                  alt="img"
                />
                {!isImageExist ? (
                  <div
                    onClick={selectFile}
                    className="absolute top-1/2 left-1/2 bg-black bg-opacity-80 py-4 px-10 rounded-2xl -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  >
                    <h2 className="text-white text-sm text-nowrap font-semibold">
                      Select Image
                    </h2>
                  </div>
                ) : (
                  <>
                    <div
                      onClick={selectFile}
                      className="w-full h-14 absolute bottom-0 left-0 bg-black flex items-center justify-center bg-opacity-45 cursor-pointer"
                    >
                      <h2 className="text-white text-sm text-nowrap font-semibold mb-2">
                        Change Image
                      </h2>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
          <div className="w-full flex justify-end items-center">
            <button
              onClick={uploadImg}
              className={`btn btn-active btn-accent ${
                !isImageExist ? "btn-disabled" : ""
              }`}
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
