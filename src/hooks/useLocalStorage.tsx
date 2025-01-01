import { useState, useEffect, useCallback } from "react";

// Create a global event system for storage updates
const storageSubscribers = new Map<string, Set<(value: unknown) => void>>();

// Helper to notify all subscribers for a specific key
const notifySubscribers = <T,>(key: string, value: T) => {
  const subscribers = storageSubscribers.get(key);
  if (subscribers) {
    subscribers.forEach((callback) => callback(value));
  }
};

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Get from local storage then
  // parse stored json or return initialValue
  const readValue = useCallback((): T => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  }, [initialValue, key]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  // Register subscriber for this key
  useEffect(() => {
    const subscriber = (newValue: unknown) => {
      setStoredValue(newValue as T);
    };

    // Add subscriber to the set
    if (!storageSubscribers.has(key)) {
      storageSubscribers.set(key, new Set());
    }
    storageSubscribers.get(key)?.add(subscriber);

    // Clean up on unmount
    return () => {
      storageSubscribers.get(key)?.delete(subscriber);
      if (storageSubscribers.get(key)?.size === 0) {
        storageSubscribers.delete(key);
      }
    };
  }, [key]);

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));

        // Notify all other subscribers
        notifySubscribers(key, valueToStore);
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue] as const;
}

export default useLocalStorage;


// import { useEffect, useState } from "react";

// export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
//   const [value, setValue] = useState<T>(() => {
//     const jsonValue = localStorage.getItem(key);
//     if (jsonValue == null) {
//       if (typeof initialValue === "function") {
//         return (initialValue as () => T)();
//       } else {
//         return initialValue;
//       }
//     } else {
//       return JSON.parse(jsonValue);
//     }
//   });

//   useEffect(() => {
//     localStorage.setItem(key, JSON.stringify(value));
//   }, [value, key]);

//   return [value, setValue] as [T, typeof setValue];
// }

