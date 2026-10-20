import { Octokit } from "@octokit/core";
import { env } from "cloudflare:workers";

// Create the client inside a request-dependent function instead of global scope.
// Crea el cliente dentro de una función dependiente de la solicitud, no en el ámbito global.
export function getGithubClient(): Octokit {
    return new Octokit({
        auth: env.GITHUB_TOKEN,
    });
}