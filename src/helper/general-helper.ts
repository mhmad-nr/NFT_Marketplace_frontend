import * as ethers from "ethers";
import { toast } from "react-toastify";
import { activeItemsType } from "../types";
import { isValidAddress } from ".";
export const rString = (str: string, max: number) =>
  str.substring(0, max) + "..." + str.substring(str.length - max);
export function sameMembers<T>(firstArray: T[], secondArray: T[]) {
  const containsAll = (first: T[], second: T[]) =>
    second.every((secondItem) => first.includes(secondItem));
  return (
    containsAll(firstArray, secondArray) && containsAll(secondArray, firstArray)
  );
}

export const saveToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  toast("Copied in clipboard", {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
export function concat<T>(one: T[], two: T[]): T[] {
  const c = one.concat(two);
  return c.filter((item, pos) => c.indexOf(item) === pos);
}

export const getFormatPrice = (price: string) => {
  const amount =
    price.length > 10
      ? ethers.parseUnits(price, "wei")
      : ethers.parseUnits(price, "ether");

  return ethers.formatEther(amount);
};

export function convertStringToEther(amountString: string) {
  const amount = ethers.parseUnits(amountString, "wei");
  return ethers.formatEther(amount);
}
export const getTokenListes = (items: activeItemsType) =>
  items.filter((item) => !isValidAddress(item.buyer));
