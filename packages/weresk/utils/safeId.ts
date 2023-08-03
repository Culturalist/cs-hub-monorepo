export function safeId(id?: string, digits?: number): string {
    return id || `id-${Math.floor(Math.random() * (digits || 1000)).toString()}`;
}
