import { octokit } from "../../lib/github.ts";
import type { Directory, ExerciseEntries } from "../../utils/general.ts";


// Obtiene las carpetas directamente dentro de la ruta indicada.
// Gets the directories located directly inside the given path.
async function getDirectoryContents(owner: string, repo: string, path: string): Promise<Directory[]> {
    const directories: { name: string; path: string }[] = [];
    const response = await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
        owner: owner,
        repo: repo,
        path: path,
        headers: {
            "X-GitHub-Api-Version": "2026-03-10",
        },
    });

    const exercisePath = response.data;
    if (Array.isArray(exercisePath)) {
        for (const exercise of exercisePath) {
            // Conservamos el nombre para la UI y la ruta para futuras peticiones.
            // Keep the name for the UI and the path for future requests.
            if (exercise.type === "dir") {
                directories.push({
                    name: exercise.name,
                    path: exercise.path,
                });
            }
        }
    }
    return directories;
}

// Consulta el contenido directo de cada carpeta recibida.
// Fetches the direct contents of every received directory.
async function getExercise(owner: string, repo: string, directories: Directory[]): Promise<ExerciseEntries[]> {
    const exerciseEntries: ExerciseEntries[] = [];
    for (const directory of directories) {
        // directory.path permite entrar en carpetas como arrays/withBuildIn.
        // directory.path lets us enter folders such as arrays/withBuildIn.
        const { data: exerciseNamePath } = await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
            owner: owner,
            repo: repo,
            path: directory.path,
            headers: {
                "X-GitHub-Api-Version": "2026-03-10",
            },
        });
        if (Array.isArray(exerciseNamePath)) {
            for (const exercise of exerciseNamePath) {
                // category mantiene la relación entre cada elemento y su carpeta padre.
                // category preserves the relationship between each item and its parent folder.
                exerciseEntries.push({
                    category: directory.name,
                    type: exercise.type,
                    name: exercise.name,
                    path: exercise.path
                });
            }
        }
    }
    return exerciseEntries;
}

// Obtiene y decodifica el contenido de un archivo concreto.
// Fetches and decodes the content of one specific file.
async function getFileContent(owner: string, repo: string, path: string): Promise<string> {
    const response = await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
        owner: owner,
        repo: repo,
        path: path,
        headers: {
            "X-GitHub-Api-Version": "2026-03-10",
        },
    });
    if (!Array.isArray(response.data) && response.data.type === "file" && response.data.content) {
        // GitHub devuelve el archivo en Base64; primero lo convertimos a bytes.
        // GitHub returns the file as Base64; first convert it to bytes.
        const base64Content = response.data.content.replace(/\s/g, "");
        const binaryContent = atob(base64Content);
        const bytes = Uint8Array.from(binaryContent, (c) => c.charCodeAt(0));

        // TextDecoder convierte los bytes en texto UTF-8 legible.
        // TextDecoder converts the bytes into readable UTF-8 text.
        const decodedContent = new TextDecoder("utf-8").decode(bytes);
        return decodedContent;
    } else {
        throw new Error("The specified path is not a file or does not exist.");
    }
}

export { getDirectoryContents, getExercise, getFileContent };