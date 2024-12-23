import { render, screen, fireEvent } from "@testing-library/react";
import ContextMenu from "./ContextMenu";

const mockHandleClickOutside = jest.fn();

describe("ContextMenu", () => {
  const defaultProps = {
    x: 100,
    y: 100,
    fileName: "test-file.txt",
    handleClickOutside: mockHandleClickOutside,
  };

  beforeEach(() => {
    mockHandleClickOutside.mockClear();
  });

  it("should render the context menu at the correct position", () => {
    render(<ContextMenu {...defaultProps} />);

    const contextMenu = screen.getByRole("list");
    expect(contextMenu).toHaveStyle(`top: 100px; left: 100px;`);
  });

  it("should call handleClickOutside when an action is clicked", () => {
    render(<ContextMenu {...defaultProps} />);

    const copyItem = screen.getByText(/Copy/);
    fireEvent.click(copyItem);

    expect(mockHandleClickOutside).toHaveBeenCalledTimes(1);
    expect(mockHandleClickOutside).toHaveBeenCalledWith(expect.any(MouseEvent));
  });

  it("should log the correct action for each menu item", () => {
    render(<ContextMenu {...defaultProps} />);

    const copyItem = screen.getByText(/Copy/);
    const deleteItem = screen.getByText(/Delete/);
    const renameItem = screen.getByText(/Rename/);

    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    fireEvent.click(copyItem);
    fireEvent.click(deleteItem);
    fireEvent.click(renameItem);

    expect(consoleSpy).toHaveBeenCalledWith("Copy test-file.txt");
    expect(consoleSpy).toHaveBeenCalledWith("Delete test-file.txt");
    expect(consoleSpy).toHaveBeenCalledWith("Rename test-file.txt");

    consoleSpy.mockRestore();
  });

  it("should render the menu items", () => {
    render(<ContextMenu {...defaultProps} />);

    expect(screen.getByText(/Copy/)).toBeInTheDocument();
    expect(screen.getByText(/Delete/)).toBeInTheDocument();
    expect(screen.getByText(/Rename/)).toBeInTheDocument();
  });
});
