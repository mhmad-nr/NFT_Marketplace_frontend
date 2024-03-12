import { lazy } from "react";
import { MainLayout } from "../layout";
import { NavLayout } from "../layout";

// const CreateNFT = lazy(() => import("../page/CreateNFT"));
// const Marketplace = lazy(() => import("../page/Marketplace"));
const Home = lazy(() => import("../page/Home"));
const MintInfo = lazy(() => import("../page/MintInfo"));
// const Profile = lazy(() => import("../page/Profile"));
// const MyTokens = lazy(() => import("../page/MyTokens"));
// const Test = lazy(() => import("../page/Test"));

const PublicRoutes = [
  {
    path: "/",
    Element: Home,
    Layout: MainLayout,
  },
  {
    path: "/mintinfo",
    Element: MintInfo,
    Layout: MainLayout,
  },
  // {
  //   path: "/createnft",
  //   Element: CreateNFT,
  //   Layout: NavLayout,
  // },
  // {
  //   path: "/profile",
  //   Element: Profile,
  //   Layout: MainLayout,
  // },
  // {
  //   path: "/exa",
  //   Element: Profile,
  //   Layout: MainLayout,
  // },
  // {
  //   path: "/test",
  //   Element: Test,
  //   Layout: MainLayout,
  // },
  // {
  //   path: "/marketplace",
  //   Element: Marketplace,
  //   Layout: MainLayout,
  // },
  // {
  //   path: "/tokens",
  //   Element: MyTokens,
  //   Layout: MainLayout,
  // },

  // {
  //   path: "/signup",
  //   Element: SignUp,
  // },
];
// const AuthRoutes = [
//   // {
//   //   path: "*",
//   //   Element: NotFound,
//   // },
// ];
export { PublicRoutes };
