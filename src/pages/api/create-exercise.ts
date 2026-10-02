import type { ExerciseEntries } from "../../utils/general.ts";
import { getDirectoryContents, getExercise, getFileContent } from "./get-exercise.ts";
const data = ["ErickCraft1", "Practica_Java"];
// Get the top-level practice directories from GitHub.
// Obtiene de GitHub las carpetas principales de prácticas.
export const directories = await getDirectoryContents(
    data[0],
    data[1],
    "src/practice"
);

// Get the entries contained directly inside each top-level directory.
// Obtiene los elementos contenidos directamente en cada carpeta principal.
export const exerciseEntries = await getExercise(
    data[0],
    data[1],
    directories
);

// Get the subdirectories of each exercise entry.
// Obtiene las subcarpetas de cada entrada de ejercicio.
export const subDirectories: ExerciseEntries[] = [];
for (const entry of exerciseEntries) {
    if (entry.type !== "dir") {
        continue;
    }
    // If the entry is a directory, get its subdirectories.
    // Si la entrada es una carpeta, obtén sus subcarpetas.
    const children = await getExercise(
        data[0],
        data[1],
        [entry]
    );
    subDirectories.push(...children)
}

// This is a temporary fixed-file test; the UI will later provide this path.
// Esta es una prueba temporal con un archivo fijo; después la UI proporcionará la ruta.
const content = await getFileContent(
    data[0],
    data[1],
    "src/practice/bucles/exercise1.java"
);

// console.log(content);