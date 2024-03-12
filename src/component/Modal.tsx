import { FC, PropsWithChildren, forwardRef } from "react";
type propsType = {
  style?: string;
} & PropsWithChildren;

export const Modal = forwardRef<HTMLDialogElement, propsType>(
  ({ children, style }, ref) => {
    return (
      <dialog ref={ref} className="modal">
        <div className="modal-box">{children}</div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    );
  }
);
