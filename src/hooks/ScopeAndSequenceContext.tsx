import { createContext, useState } from "react";
import { ScopeAndSequence } from "../model";
import semver from "semver";

interface ScopeAndSequenceContextType {
  scopeAndSequence: ScopeAndSequence | null;
  loadScopeAndSequence: (file: File) => void;
  saveScopeAndSequence: () => void;
  unloadScopeAndSequence: () => void;
  updatedVersion: string | null;
  setUpdatedVersion: (version: string | null) => void;
  selectedLevel: number;
  setSelectedLevel: (level: number) => void;
}

export const ScopeAndSequenceContext =
  createContext<ScopeAndSequenceContextType | null>(null);

interface ScopeAndSequenceProviderProps {
  children: React.ReactNode;
}
export function ScopeAndSequenceProvider({
  children,
}: ScopeAndSequenceProviderProps) {
  let localStorageItem: ScopeAndSequence | null = null;
  try {
    const storedItem = localStorage.getItem("scopeAndSequence");
    localStorageItem = storedItem ? JSON.parse(storedItem) : null;
  } catch (error) {
    console.error("Error parsing scope and sequence from localStorage:", error);
  }
  const [scopeAndSequence, _setScopeAndSequence] =
    useState<ScopeAndSequence | null>(localStorageItem);

  const [updatedVersion, _setUpdatedVersion] = useState<string | null>(null);

  const [selectedLevel, setSelectedLevel] = useState(0);

  function setScopeAndSequence(data: ScopeAndSequence | null) {
    if (data) {
      localStorage.setItem("scopeAndSequence", JSON.stringify(data));
    } else {
      localStorage.removeItem("scopeAndSequence");
    }
    _setScopeAndSequence(data);
  }

  function loadScopeAndSequence(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const data = JSON.parse(result);
      setScopeAndSequence(data);
    };
    reader.readAsText(file);
  }

  function unloadScopeAndSequence() {
    setScopeAndSequence(null);
  }

  function saveScopeAndSequence() {
    const updatedScopeAndSequence = {
      ...scopeAndSequence,
    };
    if (updatedVersion) {
      updatedScopeAndSequence.version = updatedVersion;
    }
    const data = JSON.stringify(updatedScopeAndSequence, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "scopeAndSequence.json";
    a.click();
  }

  function setUpdatedVersion(version: string | null) {
    if (!version) {
      _setUpdatedVersion(null);
      return;
    }
    if (
      scopeAndSequence &&
      semver.valid(version) &&
      semver.lt(scopeAndSequence.version, version)
    ) {
      _setUpdatedVersion(version);
    } else {
      console.error("Invalid version");
    }
  }

  return (
    <ScopeAndSequenceContext.Provider
      value={{
        scopeAndSequence,
        loadScopeAndSequence,
        saveScopeAndSequence,
        unloadScopeAndSequence,
        updatedVersion,
        setUpdatedVersion,
        selectedLevel,
        setSelectedLevel,
      }}
    >
      {children}
    </ScopeAndSequenceContext.Provider>
  );
}
