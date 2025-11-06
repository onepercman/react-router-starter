import { useState } from "react"

/**
 * Custom hook for syncing state with localStorage
 * @param key - localStorage key
 * @param initialValue - Initial value if key doesn't exist
 * @returns Tuple of [value, setValue, removeValue]
 * @example
 * const [user, setUser, removeUser] = useLocalStorage('user', null)
 */
export function useLocalStorage<T>(
	key: string,
	initialValue: T,
): [T, (value: T | ((val: T) => T)) => void, () => void] {
	const [storedValue, setStoredValue] = useState<T>(() => {
		try {
			if (typeof window === "undefined") {
				return initialValue
			}

			const item = window.localStorage.getItem(key)
			return item ? JSON.parse(item) : initialValue
		} catch (error) {
			console.error(`Error reading localStorage key "${key}":`, error)
			return initialValue
		}
	})

	const setValue = (value: T | ((val: T) => T)) => {
		try {
			const valueToStore =
				value instanceof Function ? value(storedValue) : value

			setStoredValue(valueToStore)

			if (typeof window !== "undefined") {
				window.localStorage.setItem(key, JSON.stringify(valueToStore))
			}
		} catch (error) {
			console.error(`Error setting localStorage key "${key}":`, error)
		}
	}

	const removeValue = () => {
		try {
			setStoredValue(initialValue)
			if (typeof window !== "undefined") {
				window.localStorage.removeItem(key)
			}
		} catch (error) {
			console.error(`Error removing localStorage key "${key}":`, error)
		}
	}

	return [storedValue, setValue, removeValue]
}
