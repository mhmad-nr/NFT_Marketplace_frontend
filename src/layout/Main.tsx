import React, { PropsWithChildren } from "react";
import { Navbar } from "../component";
import Loading from "../component/Loading";

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="relative">
      <Navbar />
      <div className="w-full mt-0 h-[calc(100vh-69px)]">{children}</div>
      <Loading />
    </div>
  );
};
