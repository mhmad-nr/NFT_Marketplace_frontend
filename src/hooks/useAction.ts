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
    activeAccount: accountType
    // accounts: accountType[]
  ) => {
    setStore({
      type: ActionKind.INIT_ACCOUNTS,
      payload: {
        activeAccount,
        // accounts
      },
    });
  };
  const readAccounts = (
    activeAccount: accountType
    //  accounts: accountType[]
  ) => {
    setStore({
      type: ActionKind.INIT_ACCOUNTS,
      payload: {
        activeAccount,
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
  return {
    changeAccount,
    initAccounts,
    resetAccounts,
    readAccounts,
    setMessageLoading: setLoading,
    setNotLoading,
    addCard,
  };
};
