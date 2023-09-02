export function typedValue<T>(input: string | number, literals: readonly T[]): T | undefined {
    let output: T | undefined = undefined;
    literals.forEach(l => {
        if (l == input) {
            output = l;
        }
    });
    return output;
}
