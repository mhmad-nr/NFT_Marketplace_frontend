import { tokenListedType } from ".";

export type accountType = string;

export type storeType = {
  isDark: boolean;
  activeAccount: accountType;
  connectedAccounts: accountType[];
  cards: tokenListedType[];
  loading: {
    isLoading: boolean;
    message: string | null;
  };
};

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};
export enum ActionKind {
  CHANGE_THEME = "CHANGE_THEME",
  INIT_ACCOUNTS = "INIT_ACCOUNTS",
  ADD_TOKEN = "ADD_TOKEN",
  LODING = "LODING",
  NOT_LODING = "NOT_LODING",
  CHANGE_ACCOUNT = "CHANGE_ACCOUNT",
  RESET_ACCOUNTS = "RESET_ACCOUNTS",
  FIND = "FIND",
  LOGIN = "DECREASE",
}

type Payload = {
  [ActionKind.INIT_ACCOUNTS]: {
    accounts: string[];
    activeAccount?: string;
  };
  [ActionKind.CHANGE_ACCOUNT]: {
    activeAccount: string;
  };
  [ActionKind.ADD_TOKEN]: {
    card: tokenListedType;
  };
  [ActionKind.LODING]: {
    loading: {
      message: string | null;
    };
  };
  [ActionKind.NOT_LODING]: {};
  [ActionKind.RESET_ACCOUNTS]: {};
  [ActionKind.CHANGE_THEME]: {
    isDark?: string;

  };
};

export type Actions = ActionMap<Payload>[keyof ActionMap<Payload>];

export type constextType = {
  store: storeType;
  setStore: React.Dispatch<Actions>;
};
