import React, { useState, useRef, useEffect } from "react";
import { ReactComponent as FileIcon } from '../../../assets/icons/file.svg';
import ContextMenu from '../ContextMenu/ContextMenu';
import { FileProps } from "./types";
import './File.css';

const File: React.FC<FileProps> = ({ file, style }) => {
  const [active, setActive] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const fileRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (fileRef.current) {
      const rect = fileRef.current.getBoundingClientRect();
      setContextMenu({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (fileRef.current && !fileRef.current.contains(e.target as Node)) {
      setContextMenu(null);
    }
  };

  const handleActiveStatus = () => {
    setActive(!active);
  };

  useEffect(() => {
    if (contextMenu) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [contextMenu]);

  return (
    <div
      style={style}
      ref={fileRef}
      onClick={handleActiveStatus}
      onContextMenu={handleContextMenu}
      className={`file-container ${active ? 'active' : ''}`}
    >
      <FileIcon />
      {file.name}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          fileName={file.name}
          handleClickOutside={handleClickOutside}
        />
      )}
    </div>
  );
};

export default File;
