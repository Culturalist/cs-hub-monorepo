export function longestWord(input: string): string {
    return input.split(" ").sort((a, b) => b.length - a.length)[0];
}
