import {
  Code,
  Morpheme,
  ScopeAndSequence,
  ScopeAndSequenceLevel,
} from "./model";

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

export function reassignCumulativeItems(data: ScopeAndSequenceLevel[]) {
  let updatedData = [...data];
  let cumulativeCode: Code[] = [];
  let cumulativeMorphemes: Morpheme[] = [];

  for (const levelData of data) {
    const updatedLevel = { ...levelData };

    updatedLevel.cumulativeCode = cumulativeCode;
    cumulativeCode = [...cumulativeCode, ...levelData.newCode];

    updatedLevel.cumulativeMorphemes = cumulativeMorphemes;
    cumulativeMorphemes = [...cumulativeMorphemes, ...levelData.newMorphemes];

    updatedData = updatedData.map((level) =>
      updatedLevel.id === level.id ? updatedLevel : level
    );
  }

  return updatedData;
}

export function getNextId(data: ScopeAndSequenceLevel[]) {
  return data.reduce((maxId, level) => Math.max(maxId, level.id), 0) + 1;
}

export function getPrettyGameName(game: string) {
  switch (game) {
    case "mysticMatch":
      return "Mystic Match";
    case "wordWeaver":
      return "Word Weaver";
    case "phonemeForge":
      return "Phoneme Forge";
    case "trickyWords":
      return "Tricky Words";
    case "sentenceBuilder":
      return "Sentence Builder";
    case "wordRifts":
      return "Word Rifts";
    case "wordSums":
      return "Word Sums";
    default:
      return game;
  }
}

export function createGameItem(fieldName: keyof ScopeAndSequenceLevel) {
  switch (fieldName) {
    case "newCode":
      return { spelling: "", phoneme: [] };

    case "newMorphemes":
      return { morpheme: "", type: "base" };

    case "wordSets":
    case "wordChains":
      return { word: "", phonemes: [] };

    case "morphemeWordSets":
      return { word: "", morphemes: [] };

    case "sentences":
      return { sentence: "" };

    case "trickyWords":
      return "";
  }
}
