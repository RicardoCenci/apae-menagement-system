
export function createLocalStorage<T>(key: string) {
    return {
        get: () => {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : null;
        },
        set: (value: T) => {
            localStorage.setItem(key, JSON.stringify(value));
        },
        remove: () => {
            localStorage.removeItem(key);
        }
    }
}