import { ActionKind, Actions, storeType } from "../types";

export function reducer(store: storeType, action: Actions): storeType {
  const { type, payload } = action;
  switch (type) {
    case ActionKind.INIT_ACCOUNTS:
      console.log(payload);
      const activeAccount = payload.activeAccount
        ? payload.activeAccount
        : payload.accounts[0];
      return {
        ...store,
        activeAccount,
        connectedAccounts: payload.accounts,
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
    case ActionKind.CHANGE_THEME:
      const lastTheme = payload.isDark;
      let isDark = !store.isDark;

      if (lastTheme) {
        isDark = lastTheme == "dark";
      }
      console.log(store.isDark);
      
      document.documentElement.setAttribute(
        "data-theme",
        isDark ? "dark" : "light"
      );
      return {
        ...store,
        isDark,
      };
    default:
      return store;
  }
}
