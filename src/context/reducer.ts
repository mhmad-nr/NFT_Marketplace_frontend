import { ActionKind, storeType } from "../types";

export function reducer(store: storeType, action: any): storeType {
  const { type, payload } = action;
  switch (type) {
    case ActionKind.INIT_ACCOUNTS:
      return {
        ...store,
        activeAccount: payload.activeAccount,
        // accounts: payload.accounts
      };
    case ActionKind.CHANGE_ACCOUNT:
      return {
        ...store,
        activeAccount: payload.activeAccount,
      };
    case ActionKind.ADD_TOKEN:
      const newCards = store.cards;
      newCards.push(payload.card);

      return {
        ...store,
        cards: newCards,
      };
    case ActionKind.LODING:
      const message = payload.loading?.message;
      return {
        ...store,
        loading: {
          isLoading: true,
          message,
        },
      };
    case ActionKind.NOT_LODING:
      return {
        ...store,
        loading: {
          isLoading: false,
          message: null,
        },
      };
    default:
      return store;
  }
}
