import styled from "styled-components";
import { ScopeAndSequenceLevel } from "../model.ts";
import GameDataItem from "./GameDataItem.tsx";
import GameDataSheet from "./GameDataSheet.tsx";
import { createGameItem } from "@/utils.ts";
import { useMemo } from "react";

interface GameDataProps {
  fieldName: keyof ScopeAndSequenceLevel;
  levelData: ScopeAndSequenceLevel;
  updateLevel: (updatedLevel: ScopeAndSequenceLevel) => void;
  showAddButton?: boolean;
}
export default function GameData({
  fieldName,
  levelData,
  updateLevel,
  showAddButton = false,
}: GameDataProps) {
  const newGameItem = useMemo(() => createGameItem(fieldName), [fieldName]);

  const renderField = () => {
    if (!levelData[fieldName] || !Array.isArray(levelData[fieldName])) {
      return <p>No data available</p>;
    }

    switch (fieldName) {
      case "newCode":
      case "cumulativeCode":
        return renderItemList(levelData[fieldName], "spelling");

      case "newMorphemes":
      case "cumulativeMorphemes":
        return renderItemList(levelData[fieldName], "morpheme");

      case "wordSets":
      case "wordChains":
        return renderItemList(levelData[fieldName], "word");

      case "morphemeWordSets":
        return renderItemList(levelData[fieldName], "word");

      case "sentences":
        return renderItemList(levelData[fieldName], "sentence");

      case "trickyWords":
        return renderItemList(levelData[fieldName]);

      default:
        return <p>Unsupported field</p>;
    }
  };

  function renderItemList<T>(items: T[], displayKey?: string) {
    return (
      <>
        {items.map((item, index) => (
          <GameDataSheet
            key={index}
            fieldName={fieldName}
            item={item}
            index={index}
            levelData={levelData}
            updateLevel={updateLevel}
          >
            <GameDataItem
              value={
                (displayKey ? item[displayKey as keyof T] : item) as string
              }
            />
          </GameDataSheet>
        ))}
        {showAddButton && (
          <GameDataSheet
            fieldName={fieldName}
            index={items.length}
            levelData={levelData}
            item={newGameItem}
            updateLevel={updateLevel}
          >
            <GameDataItem value="+" />
          </GameDataSheet>
        )}
      </>
    );
  }

  return <GameDataContainer>{renderField()}</GameDataContainer>;
}

const GameDataContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.1rem;
`;
