import { PropsWithChildren } from "react";
import Loading from "../component/Loading";
import { Footer } from "../component/Footer";
import { NavLayout } from "./Nav";

export const MainLayout = ({ children }: PropsWithChildren) => {
  console.log("adasdasd55555555555");
  
  return (
    <>
      <NavLayout>
        <main>{children}</main>
        <Footer />
        <Loading />
      </NavLayout>
    </>
  );
};
