export interface ContextMenuProps {
    x: number;
    y: number;
    fileName: string
    handleClickOutside: (e: MouseEvent) => void;
}