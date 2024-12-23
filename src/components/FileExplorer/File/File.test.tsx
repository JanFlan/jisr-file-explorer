/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import File from './File';
import { FileProps } from './types';

jest.mock('../ContextMenu/ContextMenu', () => ({
    __esModule: true,
    default: ({ x, y, fileName }: { x: number; y: number; fileName: string }) => (
        <div data-testid="context-menu">
            <span>{fileName}</span>
        </div>
    ),
}));

describe('File Component', () => {
    const file = { name: 'TestFile.txt', id: '1', type: 'file' };
    const defaultProps: FileProps = { file, style: { color: 'black' } };

    it('renders the file name and icon', () => {
        render(<File {...defaultProps} />);
        expect(screen.getByText('TestFile.txt')).toBeInTheDocument();
    });

    it('toggles active state on click', () => {
        render(<File {...defaultProps} />);
        const fileContainer = screen.getByText('TestFile.txt').closest('div')!;
        expect(fileContainer).not.toHaveClass('active');
        fireEvent.click(fileContainer);
        expect(fileContainer).toHaveClass('active');
        fireEvent.click(fileContainer);
        expect(fileContainer).not.toHaveClass('active');
    });

    it('shows context menu on right-click', () => {
        render(<File {...defaultProps} />);
        const fileContainer = screen.getByText('TestFile.txt').closest('div')!;
        expect(screen.queryByTestId('context-menu')).not.toBeInTheDocument();
        fireEvent.contextMenu(fileContainer);
        expect(screen.getByTestId('context-menu')).toBeInTheDocument();
    });

    it('closes context menu when clicking outside', () => {
        render(<File {...defaultProps} />);
        const fileContainer = screen.getByText('TestFile.txt').closest('div')!;
        fireEvent.contextMenu(fileContainer);
        expect(screen.getByTestId('context-menu')).toBeInTheDocument();
        fireEvent.click(document);
        expect(screen.queryByTestId('context-menu')).not.toBeInTheDocument();
    });

    it('removes context menu when unmounted', () => {
        const { unmount } = render(<File {...defaultProps} />);
        const fileContainer = screen.getByText('TestFile.txt').closest('div')!;
        fireEvent.contextMenu(fileContainer);
        expect(screen.getByTestId('context-menu')).toBeInTheDocument();
        unmount();
        fireEvent.click(document);
        expect(screen.queryByTestId('context-menu')).not.toBeInTheDocument();
    });
});
