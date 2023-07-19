import React, { useState, useCallback, Dispatch, SetStateAction, UIEventHandler, CSSProperties, PropsWithChildren } from "react";

import Menu from "@components/Menu";

interface MenuType {
  style?: CSSProperties;
}

type ReturnTypes = [({ children, style }: PropsWithChildren<MenuType>) => React.JSX.Element, (e: any) => void, boolean, Dispatch<SetStateAction<boolean>>];

const useMenu = (): ReturnTypes => {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenuFn: UIEventHandler<any> = useCallback(
    (e) => {
      e.stopPropagation();
      setShowMenu((prev) => !prev);
    },
    [setShowMenu],
  );

  const menuGenerator = ({ children, style }: PropsWithChildren<MenuType>) => {
    return (
      <Menu show={showMenu} style={style} onCloseModal={toggleMenuFn}>
        {children}
      </Menu>
    );
  };
  return [menuGenerator, toggleMenuFn, showMenu, setShowMenu];
};

export default useMenu;
