import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { StoreProvider } from "./context";
import AppRoute from "./route";
import { MetaMaskProvider } from "@metamask/sdk-react";
import { ToastContainer } from "react-toastify";
const url =
  "https://api.studio.thegraph.com/query/960/second-nftmarketplace/version/latest";
const client = new ApolloClient({
  uri: url,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
      <MetaMaskProvider
        debug={false}
        sdkOptions={{
          dappMetadata: {
            name: "Example React Dapp",
            url: window.location.href,
          },
        }}
      >
        <StoreProvider>
          <ApolloProvider client={client}>
            <AppRoute />
            <ToastContainer />
          </ApolloProvider>
        </StoreProvider>
      </MetaMaskProvider>
    </>
  );
}

export default App;
