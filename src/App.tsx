import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { StoreProvider } from "./context";
import { useEffect } from "react";
import AppRoute from "./Route";

declare global {
  interface Window {
    ethereum?: any;
  }
}
const url =
  "https://api.studio.thegraph.com/query/960/second-nftmarketplace/version/latest";
const client = new ApolloClient({
  uri: url,
  cache: new InMemoryCache(),
});

function App() {
  useEffect(() => {
    if (window.ethereum) {
      isWalletConnected();
      checkMetamaskHasChanged();
    }
  }, []);

  const isWalletConnected = async () => {
    try {
      const { ethereum } = window;
      console.log(ethereum);

      if (!ethereum) return;
      const accounts: string[] = await ethereum.request({
        method: "eth_accounts",
      });
      console.log("accounts: ", accounts);
      if (accounts.length > 0) {
        console.log(accounts);

        // setState({ ...state, accounts, modalStage: stageType.STAGE_ONE })
      } else {
        // setState({ ...state, accounts, modalStage: stageType.STAGE_FIRST_ERROR })
      }
    } catch (error) {
      // console.log("error: ", error);
    }
  };

  const checkMetamaskHasChanged = () => {
    window.ethereum.on("accountsChanged", (accounts: string[]) => {
      console.log(accounts);
    });
  };
  return (
    <>
      <StoreProvider>
        <ApolloProvider client={client}>
          <AppRoute />
        </ApolloProvider>
      </StoreProvider>
    </>
  );
}

export default App;
