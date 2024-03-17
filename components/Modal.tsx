import FocusTrap from "focus-trap-react";
import React, { ReactNode } from "react";
import { createPortal } from "react-dom";

type Props = {
  title: string;
  children: ReactNode;
  onDismiss?: () => void;
};

const Modal = ({ title, children, onDismiss }: Props) => {
  return createPortal(
    <div className="flex justify-center items-center fixed left-0 right-0 top-0 bottom-0 bg-black/30">
      <FocusTrap
        focusTrapOptions={{
          clickOutsideDeactivates: false,
          onDeactivate: onDismiss,
        }}
      >
        <div className="absolute flex-col bg-slate-800 p-8 w-96">
          <div className="justify-center">
            <span>Modal Header</span>
          </div>
          <div>{children}</div>
        </div>
      </FocusTrap>
    </div>,
    document.body
  );
};

export default Modal;
