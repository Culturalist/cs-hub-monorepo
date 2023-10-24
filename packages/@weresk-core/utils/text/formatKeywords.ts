export function formatKeywords(input: string): string {
    return input.replace(/\n+/gm, ', ').replace(/\s\s+/g, ' ').trim();
}
