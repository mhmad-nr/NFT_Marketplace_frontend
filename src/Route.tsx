import React, { lazy } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import CreateNFT from "./page/CreateNFT";
import Marketplace from "./page/Marketplace";
import Home from "./page/Home";
import { MainLayout } from "./layout";
import Loading from "./component/Loading";
import MyTokens from "./page/MyTokens";
// import { PublicRoutes, AuthRoutes } from './routes';

// const MainLayout = lazy(() => import('../layout/MainLayout'));
// const AuthLayout = lazy(() => import('../layout/AuthLayout'));

const AppRoute = () => {
  // const { token } = useSelector(store => store.Auth.user);
  const token = true;
  return (
    <React.Suspense fallback={<Loading />}>
      <Router>
        <MainLayout>
          <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/tokens"} element={<MyTokens />} />
            <Route path={"/createnft"} element={<CreateNFT />} />
            <Route path={"/marketplace"} element={<Marketplace />} />
          </Routes>
        </MainLayout>
        {/* {PublicRoutes.map(({ path, Element }, index) => {
              return (
                  <Route key={index} path={path} element={<MainLayout page={<Element />} />} />
                        )
                    })}
                    {AuthRoutes.map(({ path, Element }, index) => {
                        if (!token) {
                            return <Route key={index} path={path} element={<Navigate to="/" replace={true} />} />
                        }
                        return (
                            <Route key={index} path={path} element={<MainLayout page={<AuthLayout page={<Element />} />} />} />
                        )
                    })} */}
      </Router>
    </React.Suspense>
  );
};

export default AppRoute;
