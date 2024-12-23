export interface ElementObject {
    id: string;
    name: string;
    type: string
    children?: ElementObject[];
}

export interface FolderProps {
    folder: ElementObject;
    style?: Object;
}