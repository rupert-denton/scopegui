import { ScopeAndSequence, ScopeAndSequenceLevel } from "./model";

export function getFromLocalStorage(key: string): ScopeAndSequence | null {
  let localStorageItem: ScopeAndSequence | null = null;
  try {
    const storedItem = localStorage.getItem(key);
    localStorageItem = storedItem ? JSON.parse(storedItem) : null;
  } catch (error) {
    console.error("Error parsing value from localStorage:", error);
  }
  return localStorageItem;
}

export function saveToLocalStorage(
  key: string,
  value: ScopeAndSequence | null
) {
  try {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.removeItem(key);
    }
  } catch (error) {
    console.error("Error saving value to localStorage:", error);
  }
}

export function assignLevelNumbers(data: ScopeAndSequenceLevel[]) {
  return data.map((level, index) => ({ ...level, level: index + 1 }));
}
