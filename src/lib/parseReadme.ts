interface ParsedReadme {
    title: string;
    description: string;
    finalComment?: string | null;
}

type Errors = {
    [K in keyof ParsedReadme as Capitalize<K>]: ParsedReadme[K];
}


