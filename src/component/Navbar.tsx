import { useAction, useLocalStorage, useStore } from "../hook";
import { Link, NavLink } from "react-router-dom";
import { rString } from "../helper";
import { useSDK } from "@metamask/sdk-react";
import EtherArtBlack from "../assets/img/logo/EtherArt-logos_black.png";
import EtherArtWhite from "../assets/img/logo/EtherArt-logos_white.png";
import { LocalStorageEnum, accountType } from "../types";
import { MetaMaskAvatar } from "react-metamask-avatar";
import { useEffect, useState } from "react";
import { ReactComponent as ProfileSvg } from "../assets/icon/profile.svg";
import { Icon } from "./Icon";

export const Navbar = () => {
  const { initAccounts, changeAccount, changeTheme: useTheme } = useAction();
  const { store } = useStore();
  const { sdk } = useSDK();
  const { setItem } = useLocalStorage();
  const [state, setState] = useState({
    isSmall: false,
  });
  useEffect(() => {
    const handleScroll = () => {
      // setState((prevState) => {
      //   if (window.scrollY <= 16 && prevState.isSmall) {
      //     if (prevState.isSmall) {
      //       return { ...prevState, isSmall: false };
      //     } else {
      //       return prevState;
      //     }
      //   } else {
      //     if (!prevState.isSmall) {
      //       return { ...prevState, isSmall: true };
      //     } else {
      //       return prevState;
      //     }
      //   }
      // });
      if (window.scrollY <= 16) {
        setState({ isSmall: false });
      } else {
        setState({ isSmall: true });
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const connect = async () => {
    try {
      const accounts = (await sdk?.connect()) as string[];
      initAccounts(accounts);
      setItem(LocalStorageEnum.ACTIVE_ADDRESS, JSON.stringify(accounts[0]));
      setItem(LocalStorageEnum.ADDRESSES, JSON.stringify(accounts));
    } catch (err) {
      console.warn(`failed to connect..`, err);
    }
  };
  const isWalletConnected = store.activeAccount.length > 0;
  const { activeAccount, connectedAccounts, isDark } = store;

  const changeActiveAccount = (newActiveAccount: accountType) => {
    setItem(LocalStorageEnum.ACTIVE_ADDRESS, JSON.stringify(newActiveAccount));
    changeAccount(newActiveAccount);
  };
  const changeTheme = () => {
    setItem(LocalStorageEnum.THEME, JSON.stringify(isDark));
    useTheme();
  };
  return (
    <div
      className={` w-full top-0 z-[999] px-10 pt-4 ${
        state.isSmall ? "fixed left-1/2 -translate-x-1/2 h-0" : "absolute"
      }`}
    >
      <div
        className={`container bg-shadow rounded-full shadow-lg mx-auto navbar justify-between py-0 px-[10px] transition-all delay-200 ${
          state.isSmall ? (isWalletConnected ? "w-[118px]" : "w-[155px]") : ""
        } ${isDark ? "bg-base-300" : ""} transition-all`}
      >
        <div className={state.isSmall ? "w-0" : ""}>
          <Link
            className="btn btn-ghost w-auto h-auto  rounded-full text-xl"
            to={"/"}
          >
            <div
              className={`overflow-hidden transition-all delay-150 w-[121px] ${
                state.isSmall ? "!w-0" : ""
              }`}
            >
              <img
                className="w-32 h-6 max-w-max"
                src={isDark ? EtherArtWhite : EtherArtBlack}
              />
            </div>
          </Link>
        </div>
        {/* <div className=" hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active bg-base-200" : ""
                }
                to={"/tokens"}
              >
                My NFT
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active bg-base-200" : ""
                }
                to={"/marketplace"}
              >
                NFT MarketPlace
              </NavLink>
            </li>
          </ul>
        </div> */}
        <div className="flex gap-x-4">
          <label className="swap swap-rotate">
            <svg
              onClick={changeTheme}
              className={`swap-${isDark ? "on" : "off"} fill-current w-8 h-8`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>
            <svg
              onClick={changeTheme}
              className={`swap-${isDark ? "off" : "on"} fill-current w-8 h-8`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
          {!isWalletConnected ? (
            <button className="btn btn-info rounded-full" onClick={connect}>
              Connect
            </button>
          ) : (
            <>
              <div className="dropdown dropdown-bottom dropdown-end">
                <button
                  tabIndex={0}
                  className={`btn rounded-full transition-all delay-200 btn-active w-52 ${
                    state.isSmall
                      ? "w-[50px] justify-center items-center p-0 gap-0"
                      : "justify-between"
                  }`}
                >
                  <MetaMaskAvatar address={activeAccount} size={30} />
                  <div
                    className={`inline transition-all delay-200 overflow-hidden ${
                      state.isSmall ? "w-0 " : " w-[132px]"
                    }`}
                  >
                    {rString(activeAccount, 8)}
                  </div>
                </button>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box"
                >
                  {connectedAccounts.map((address) => {
                    return (
                      <li key={address}>
                        <a
                          onClick={() => changeActiveAccount(address)}
                          className={`text-[10px] ${
                            address == activeAccount
                              ? "bg-base-300 font-semibold"
                              : ""
                          }`}
                        >
                          {address}
                        </a>
                      </li>
                    );
                  })}
                  <li>
                    <Link className="" to={"/profile"}>
                      <Icon Element={ProfileSvg} />
                      <span className="text-sm text-black dark:text-white font-semibold">
                        Profile
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
              {/* <button className="button btn rounded-full">
                <SettingSvg />
              </button> */}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
