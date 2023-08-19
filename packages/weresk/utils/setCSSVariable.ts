export function setCSSVariable(variable: string, value: string | number) {
    if (typeof document !== 'undefined') {
        document.documentElement.style.setProperty(`--${variable}`, value.toString());
    }
}
