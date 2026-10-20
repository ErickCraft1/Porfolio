import { exerciseRepository } from "../../config/exercises.ts";
import { getDirectoryContents, getExercise } from "./get-exercise.ts";

const { owner, repo } = exerciseRepository;

// Load all navigation data during the page request.
// Carga todos los datos de navegación durante la solicitud de la página.
export async function getExerciseNavigation() {
    // Get the top-level practice directories.
    // Obtiene los directorios principales de prácticas.
    const directories = await getDirectoryContents(
        owner,
        repo,
        "src/practice"
    );

    // Get the direct entries inside each practice directory.
    // Obtiene los elementos directos dentro de cada directorio de prácticas.
    const exerciseEntries = await getExercise(
        owner,
        repo,
        directories
    );

    // Only directories need another request for their children.
    // Solo los directorios necesitan otra solicitud para obtener sus hijos.
    const directoryEntries = exerciseEntries.filter(
        (entry) => entry.type === "dir"
    );

    // Request the children of all nested directories concurrently.
    // Solicita simultáneamente los elementos de todos los directorios anidados.
    const nestedResults = await Promise.all(
        directoryEntries.map((entry) =>
            getExercise(
                owner,
                repo,
                [entry]
            )
        )
    );

    // Flatten the grouped results into one list for the navigation component.
    // Convierte los resultados agrupados en una lista para el componente de navegación.
    const subDirectories = nestedResults.flat();

    return {
        directories,
        exerciseEntries,
        subDirectories
    };
}
