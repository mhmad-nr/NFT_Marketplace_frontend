import { ReactComponent as CelebrationSvg } from "../../assets/icon/celebration.svg";
import { ReactComponent as CelebrationFlagSvg } from "../../assets/icon/celebration-flag.svg";
import { ReactComponent as PartySvg } from "../../assets/icon/party.svg";
import { Link } from "react-router-dom";
// import { ReactComponent as CelebrationSvg } from '../../assets/icon/celebration.svg?react'

export const Done = ({ onRefresh }: { onRefresh: () => void }) => {
  return (
    <>
      <CelebrationSvg className="absolute top-0 left-96" />
      <div className="border flex-1 border-t-0 bg-[#3b4654] px-12 pb-8 rounded-xl border-C14 pt-12 relative overflow-hidden">
        <div className="w-full flex h-full justify-center flex-col items-center">
          <div className="flex absolute -top-4 left-0">
            <div className="w-1/5">
              <CelebrationFlagSvg className="w-full h-min" />
            </div>
            <div className="w-1/5">
              <CelebrationFlagSvg className="w-full h-min" />
            </div>
            <div className="w-1/5">
              <CelebrationFlagSvg className="w-full h-min" />
            </div>
            <div className="w-1/5">
              <CelebrationFlagSvg className="w-full h-min" />
            </div>
            <div className="w-1/5">
              <CelebrationFlagSvg className="w-full h-min" />
            </div>
          </div>
          <div className="flex absolute bottom-4 left-2">
            <PartySvg className="w-20 h-20" />
          </div>
          <div>
            <h2>Congratulations, your NFT has been successfully minted!</h2>
            <div className="w-full flex items-center justify-between mt-8">
              <button onClick={onRefresh} className="btn btn-primary">
                Create New!
              </button>
              <Link to={"/tokens"} className="btn btn-active">
                See My Tokens
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
