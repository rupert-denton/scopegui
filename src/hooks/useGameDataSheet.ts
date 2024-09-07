import { useContext } from "react";
import { GameDataSheetContext } from "./GameDataSheetContext";

export default function useGameDataSheet() {
  const context = useContext(GameDataSheetContext);
  if (!context) {
    throw new Error(
      "useGameDataSheet must be used within a GameDataSheetProvider"
    );
  }
  return context;
}
