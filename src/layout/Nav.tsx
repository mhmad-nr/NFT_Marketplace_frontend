import { PropsWithChildren } from "react";
import { Navbar } from "../component";

export const NavLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};
