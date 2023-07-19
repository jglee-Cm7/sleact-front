import React, { CSSProperties, UIEvent, useCallback } from "react";

import { CloseModalButton, CreateMenu } from "@components/Menu/styles";

interface Props {
  show: boolean;
  onCloseModal: (e: any) => void;
  style?: CSSProperties;
  closeButton?: boolean;
}

function Menu({ show, children, style, onCloseModal, closeButton = true }: React.PropsWithChildren<Props>) {
  const stopPropagation = useCallback((e: UIEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }, []);

  if (!show) return null;
  return (
    <CreateMenu onClick={onCloseModal}>
      <div style={style} onClick={stopPropagation} onKeyDown={stopPropagation} role="button" tabIndex={0}>
        {closeButton && <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>}
        {children}
      </div>
    </CreateMenu>
  );
}

export default Menu;
