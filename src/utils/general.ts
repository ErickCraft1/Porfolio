// A top-level directory returned by the GitHub Contents API.
// Una carpeta principal devuelta por la API de contenidos de GitHub.
export type Directory = {
    name: string;
    path: string;
}

// An entry found inside a directory, linked to its parent category.
// Un elemento encontrado dentro de una carpeta, vinculado a su categoría padre.
export type ExerciseEntries = {
    category: string;
    type: "dir" | "file" | "submodule" | "symlink";
    name: string;
    path: string;
}