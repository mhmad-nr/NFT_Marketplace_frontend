import React from "react";
import { attributeType } from "../types";

const Attribute = ({ value, trait_type, display_type }: attributeType) => {
  console.log(value);

  return (
    <div className=" flex w-full flex-col items-center gap-y-2">
      <div className="absolute bg-white bg-opacity-35 w-full top-0 left-0 pb-1  uppercase">
        <h2 className="text-base text-white font-bold text-center">Eyes</h2>
      </div>
      <div className="px-4 py-1 ">
        <h2 className="text-sm font-bold uppercase">Big</h2>
      </div>
    </div>
  );
};

export default Attribute;
