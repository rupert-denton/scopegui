import { createContext, useState } from "react";
import { ScopeAndSequence, ScopeAndSequenceLevel } from "../model";
import semver from "semver";
import {
  getFromLocalStorage,
  saveToLocalStorage,
  assignLevelNumbers,
} from "../utils";

interface ScopeAndSequenceContextType {
  scopeAndSequence: ScopeAndSequence | null;
  updatedScopeAndSequence: ScopeAndSequence | null;
  loadScopeAndSequence: (file: File) => void;
  saveScopeAndSequence: () => void;
  unloadScopeAndSequence: () => void;

  setUpdatedVersion: (version: string | null) => void;
  setUpdatedData: (data: ScopeAndSequenceLevel[]) => void;

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
  const [scopeAndSequence, _setScopeAndSequence] =
    useState<ScopeAndSequence | null>(getFromLocalStorage("scopeAndSequence"));
  function setScopeAndSequence(value: ScopeAndSequence | null) {
    saveToLocalStorage("scopeAndSequence", value);
    _setScopeAndSequence(value);
  }

  const [updatedScopeAndSequence, _setUpdatedScopeAndSequence] =
    useState<ScopeAndSequence | null>(
      getFromLocalStorage("updatedScopeAndSequence")
    );
  function setUpdatedScopeAndSequence(value: ScopeAndSequence | null) {
    saveToLocalStorage("updatedScopeAndSequence", value);
    _setUpdatedScopeAndSequence(value);
  }

  const [selectedLevel, setSelectedLevel] = useState(0);

  function loadScopeAndSequence(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const data = JSON.parse(result);
      setScopeAndSequence(data);
      setUpdatedScopeAndSequence(data);
    };
    reader.readAsText(file);
  }

  function unloadScopeAndSequence() {
    setScopeAndSequence(null);
  }

  function saveScopeAndSequence() {
    const data = JSON.stringify(updatedScopeAndSequence, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "scopeAndSequence.json";
    a.click();
  }

  function setUpdatedVersion(version: string | null) {
    if (!scopeAndSequence || !updatedScopeAndSequence) {
      console.error("No scope and sequence loaded");
      return;
    }

    let newVersion: string;
    if (
      version &&
      semver.valid(version) &&
      semver.lt(scopeAndSequence.version, version)
    ) {
      newVersion = version;
    } else {
      // Reset to original if supplied version is invalid
      newVersion = scopeAndSequence.version;
    }
    setUpdatedScopeAndSequence({
      ...updatedScopeAndSequence,
      version: newVersion,
    });
  }

  function setUpdatedData(data: ScopeAndSequenceLevel[]) {
    if (!updatedScopeAndSequence) {
      console.error("No scope and sequence loaded");
      return;
    }

    setUpdatedScopeAndSequence({
      ...updatedScopeAndSequence,
      data: assignLevelNumbers(data),
    });
  }

  return (
    <ScopeAndSequenceContext.Provider
      value={{
        scopeAndSequence,
        updatedScopeAndSequence,
        loadScopeAndSequence,
        saveScopeAndSequence,
        unloadScopeAndSequence,
        setUpdatedVersion,
        setUpdatedData,
        selectedLevel,
        setSelectedLevel,
      }}
    >
      {children}
    </ScopeAndSequenceContext.Provider>
  );
}
