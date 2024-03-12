import React from "react";
import { MetaMaskAvatar } from "react-metamask-avatar";
import { useStore } from "../hook";
import { Icon } from "../component";
import { ReactComponent as CopySvg } from "../assets/icon/copy.svg";
const Profile = () => {
  const { store } = useStore();
  const { activeAccount, connectedAccounts } = store;

  const onCopy = () => {
    console.log("aadadaad");

    navigator.clipboard.writeText(activeAccount);
  };

  return (
    <>
    
      <div className="flex mt-28">
        <div className="flex gap-x-4 items-center">
          <MetaMaskAvatar address={activeAccount} size={120} />
          <div>
            <h2 className="capitalize text-xl font-semibold ">Address</h2>
            <div className="flex items-center gap-x-4">
              <span className="text-xs">{activeAccount}</span>
              <Icon
                onClick={onCopy}
                className="cursor-pointer opacity-65 hover:opacity-100 hover:p-0 transition-all  p-0.5 w-5 h-5"
                Element={CopySvg}
              />
            </div>
          </div>
        </div>
        <div className=""></div>
      </div>
    </>
  );
};

export default Profile;
