import { useEffect, useState } from "react";

export default function useSessionStorage<T>(key: string | undefined, initialValue: T) {
    const initialize = () => {
        if (typeof window === "undefined") {
            return initialValue;
        }
        try {
            let item = null;
            if (key) {
                item = window.localStorage.getItem(key);
            }
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            return initialValue;
        }
    };

    const [storedValue, setStoredValue] = useState<T>(() => {
        return typeof window !== "undefined" ? initialize() : initialValue;
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            setStoredValue(initialize());
        }
    }, []);

    const setValue = (value: T | ((val: T) => T)) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            if (key && typeof window !== "undefined") {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            console.error(error);
        }
    };
    return [storedValue, setValue] as const;
}
