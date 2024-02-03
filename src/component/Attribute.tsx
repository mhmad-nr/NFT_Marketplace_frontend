import React from "react";
import { attributeType } from "../types";

const Attribute = ({ value, trait_type, display_type }: attributeType) => {
  console.log(value);

  return (
    <div className="inline-block">
      <div className="border border-Blue  rounded-md flex flex-col items-center gap-y-2">
        <span className="text-xs font-bold text-Blue">{trait_type}</span>
        <h2 className="text-base font-light text-blackbg">{value}</h2>
        <span className="text-xs font-bold text-C72">{display_type}</span>
      </div>
    </div>
  );
};

export default Attribute;
