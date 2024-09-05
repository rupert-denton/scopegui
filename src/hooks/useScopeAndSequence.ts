import { useContext } from "react";
import { ScopeAndSequenceContext } from "./ScopeAndSequenceContext";

export default function useScopeAndSequence() {
  const context = useContext(ScopeAndSequenceContext);
  if (!context) {
    throw new Error(
      "useScopeAndSequence must be used within a ScopeAndSequenceProvider"
    );
  }
  return context;
}
