import React from "react";
import { useStore } from "../hook";

export const Icon = ({
  Element,
  className,
  onClick,
}: {
  Element: React.FC<React.SVGProps<SVGSVGElement>>;
} & React.SVGProps<SVGSVGElement>) => {
  const { isDark } = useStore().store;

  return (
    <Element
      onClick={onClick}
      className={`${className} ${isDark ? "brightness-100 invert" : ""} `}
    />
  );
};
