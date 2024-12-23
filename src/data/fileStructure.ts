export const fileStructure = [
    {
        id: "folder1",
        name: "Folder 1",
        type: "folder",
        children: [
            { id: "file1", name: "File 1.txt", type: "file" },
            { id: "file2", name: "File 2.txt", type: "file" },
            { id: "nestedFolder1", name: "Nested Folder 1", type: "folder" },
            { id: "nestedFolder2", name: "Nested Folder 2", type: "folder", children: [{ id: "file4", name: "File 4.txt", type: "file" }] },
        ],
    },
    {
        id: "folder2",
        name: "Folder 2",
        type: "folder",
        children: [
            { id: "file3", name: "File 3.txt", type: "file" },
        ],
    },
];
