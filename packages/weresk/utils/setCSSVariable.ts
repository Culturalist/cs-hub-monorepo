export function setCSSVariable(variable: string, value: string) {
    document.documentElement.style.setProperty(`--${variable}`, value);
}
