import React, { UIEvent, useCallback } from "react";

import { CreateModal, CloseModalButton } from "@components/Modal/styles";

interface Props {
  show: boolean;
  onCloseModal: (e: any) => void;
}

function Modal({ show, children, onCloseModal }: React.PropsWithChildren<Props>) {
  const stopPropagation = useCallback((e: UIEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }, []);

  if (!show) return null;
  return (
    <CreateModal onClick={onCloseModal}>
      <div onClick={stopPropagation} onKeyDown={stopPropagation} role="button" tabIndex={0}>
        <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>
        {children}
      </div>
    </CreateModal>
  );
}

export default Modal;
