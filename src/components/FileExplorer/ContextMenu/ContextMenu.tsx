import React from "react";
import { ContextMenuProps } from "./types";
import "./ContextMenu.css";

const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, fileName, handleClickOutside }) => {

  const handleAction = (action: string) => {
    console.log(action);
    handleClickOutside(new MouseEvent('click'));
  }

  return (
    <ul
      className="context-menu"
      style={{
        top: `${y}px`,
        left: `${x}px`,
      }}
    >
      <li onClick={() => handleAction(`Copy ${fileName}`)}>Copy</li>
      <li onClick={() => handleAction(`Delete ${fileName}`)}>Delete</li>
      <li onClick={() => handleAction(`Rename ${fileName}`)}>Rename</li>
    </ul>
  );
};

export default ContextMenu;
