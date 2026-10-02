import { Octokit } from "@octokit/core";
import { env } from "cloudflare:workers";

// Cloudflare provides the secret through the Worker environment.
// Cloudflare proporciona el secreto mediante el entorno del Worker.
const token = env.GITHUB_TOKEN;

// Create the authenticated GitHub API client used by the data functions.
// Crea el cliente autenticado de la API de GitHub usado por las funciones de datos.
export const octokit = new Octokit({
    auth: token,
});