import React, { useState } from "react";
import { ReactComponent as ChevronRightIcon } from '../../../assets/icons/chevron-right.svg';
import { ReactComponent as ChevronDownIcon } from '../../../assets/icons/chevron-down.svg';
import { ReactComponent as FolderEmptyIcon } from '../../../assets/icons/folder-empty.svg';
import { ReactComponent as FolderWithFilesIcon } from '../../../assets/icons/folder-with-files.svg';

import { FolderProps } from "./types";
import File from "../File/File";

import "./Folder.css";

const Folder: React.FC<FolderProps> = ({ folder, style }) => {
  const [isOpen, setIsOpen] = useState(false);

  const expansionHandler = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div style={style}>
      <div onClick={expansionHandler} className="folder-container">
        {isOpen ?
          <ChevronDownIcon /> :
          <ChevronRightIcon />
        }
        {(folder?.children?.length ?? 0) > 0 ?
          <FolderWithFilesIcon /> :
          <FolderEmptyIcon />
        }
        {folder.name}
      </div>
      {isOpen &&
        folder?.children?.map((child) =>
          child.type === "folder" ? (
            <Folder key={child.id} folder={child} style={{ marginLeft: 40 }} />
          ) : (
            <File key={child.id} file={child} style={{ marginLeft: 40 }} />
          )
        )}
    </div>
  );
};

export default Folder;
