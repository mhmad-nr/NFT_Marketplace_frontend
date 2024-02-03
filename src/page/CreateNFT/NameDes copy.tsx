import { useRef, useState } from "react";

type propsType = {
  nftName?: string;
  nftDescription?: string;
  onNameDes: (name: string, description: string) => void;
  onBack: () => void;
};
export const NameDes = ({
  onNameDes,
  onBack,
  nftDescription,
  nftName,
}: propsType) => {
  console.log(nftDescription, nftName);

  const [state, setState] = useState({
    name: nftName ? nftName : "",
    description: nftDescription ? nftDescription : "",
  });
  const isCompleted = state.name.length > 3 && state.description.length > 3;

  return (
    <>
      <div className="border flex-1 border-t-0 bg-[#3b4654] px-12 pb-8 rounded-xl border-C14 pt-12 relative overflow-hidden">
        <div className="w-full flex h-full justify-between flex-col items-center">
          <div className="w-full">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">NFT Name:</span>
              </div>
              <input
                value={state.name}
                onChange={(e) =>
                  setState({ ...state, name: e.currentTarget.value })
                }
                type="text"
                placeholder="Name"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className="form-control">
              <div className="label">
                <span className="label-text">NFT Description</span>
              </div>
              <textarea
                value={state.description}
                onChange={(e) =>
                  setState({ ...state, description: e.currentTarget.value })
                }
                className="textarea textarea-bordered h-24"
                placeholder="Description"
              ></textarea>
            </label>
          </div>
          <div className="w-full flex justify-between items-center">
            <button onClick={onBack} className="btn btn-outline btn-error">
              Back
            </button>
            <button
              onClick={() => onNameDes(state.name, state.description)}
              className={`btn btn-active btn-accent ${
                !isCompleted ? "btn-disabled" : ""
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
