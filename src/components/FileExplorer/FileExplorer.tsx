import React from "react";
import { fileStructure } from "../../data/fileStructure";
import Folder from "./Folder/Folder";

const FileExplorer: React.FC = () => {
    return (
        <div>
            {fileStructure.map((item) => (
                <Folder key={item.id} folder={item} />
            ))}
        </div>
    );
};

export default FileExplorer;
