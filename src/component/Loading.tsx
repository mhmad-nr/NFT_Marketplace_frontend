import React from "react";
import { useStore } from "../hook";
import { useSDK } from "@metamask/sdk-react";

const Loading = () => {
  const { store } = useStore();
  const { isLoading, message } = store.loading;
  if (!isLoading) return;
  return (
    <div className="absolute z-50 top-0 left-0 w-full h-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 flex justify-center items-center">
      <div className="flex items-center flex-col gap-y-4">
        <span className="loading loading-spinner loading-lg"></span>
        <h2 className="text-1xl font-bold text-white">{message}</h2>
      </div>
    </div>
  );
};

export default Loading;
