import { ActionKind, accountType, tokenListedType } from "../types";
import { useStore } from ".";

export const useAction = () => {
  const { setStore } = useStore();
  const changeAccount = (activeAccount: accountType) => {
    setStore({
      type: ActionKind.CHANGE_ACCOUNT,
      payload: { activeAccount },
    });
  };
  const resetAccounts = () => {
    setStore({
      type: ActionKind.RESET_ACCOUNTS,
      payload: {},
    });
  };
  const initAccounts = (
    accounts: accountType[],
    activeAccount?: accountType
  ) => {
    setStore({
      type: ActionKind.INIT_ACCOUNTS,
      payload: {
        accounts,
        activeAccount,
        // accounts
      },
    });
  };
  const readAccounts = (
    activeAccount: accountType[]
    //  accounts: accountType[]
  ) => {
    setStore({
      type: ActionKind.INIT_ACCOUNTS,
      payload: {
        accounts: activeAccount,
        // accounts
      },
    });
  };
  const addCard = (card: tokenListedType) => {
    setStore({
      type: ActionKind.ADD_TOKEN,
      payload: {
        card,
      },
    });
  };
  const setLoading = (message: string | null) => {
    setStore({
      type: ActionKind.LODING,
      payload: {
        loading: {
          message,
        },
      },
    });
  };
  const setNotLoading = () => {
    setStore({
      type: ActionKind.NOT_LODING,
      payload: {},
    });
  };
  const changeTheme = (isDark?:string) => {
    setStore({
      type: ActionKind.CHANGE_THEME,
      payload: {
        isDark,
      },
    });
  };
  return {
    changeAccount,
    initAccounts,
    resetAccounts,
    readAccounts,
    setMessageLoading: setLoading,
    setNotLoading,
    addCard,
    changeTheme,
  };
};
