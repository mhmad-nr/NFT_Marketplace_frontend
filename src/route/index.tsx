import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Marketplace from "../page/Marketplace";
import Loading from "../component/Loading";
import MyTokens from "../page/MyTokens";
import Token from "../page/Token";
import { useAction, useLocalStorage } from "../hook";
import { LocalStorageEnum } from "../types";
import { PublicRoutes } from "./routes";

// const MainLayout = lazy(() => import('../layout/MainLayout'));
// const AuthLayout = lazy(() => import('../layout/AuthLayout'));

const AppRoute = () => {
  const { getItem } = useLocalStorage();
  const { initAccounts, changeTheme } = useAction();

  useEffect(() => {
    const activeAddress = getItem(LocalStorageEnum.ACTIVE_ADDRESS);
    const addresses = getItem(LocalStorageEnum.ADDRESSES);
    const theme = getItem(LocalStorageEnum.THEME);

    if (addresses && activeAddress) {
      initAccounts(JSON.parse(addresses), JSON.parse(activeAddress));
    }
    if (theme) {
      changeTheme(JSON.parse(theme));
    }

    // initAccounts()
  }, []);

  const token = true;
  return (
    <React.Suspense fallback={<Loading />}>
      <Router>
        <Routes>
          <Route
            path={"/tokens/:contractAddress/:tokenId"}
            element={<Token />}
          />
          <Route path={"/marketplace"} element={<Marketplace />} />
          {PublicRoutes.map(({ Element, path, Layout }) => {
            if (Layout) {
              return (
                <>
                  <Route
                    path={path}
                    element={
                      <Layout>
                        <Element />
                      </Layout>
                    }
                  />
                  ;
                </>
              );
            }
            return <Route path={path} element={<Element />} />;
          })}
        </Routes>
      </Router>
    </React.Suspense>
  );
};

export default AppRoute;
