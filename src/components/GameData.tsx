import styled from "styled-components";
import { ScopeAndSequenceLevel } from "../model.ts";
import GameDataItem from "./GameDataItem.tsx";
import { createGameItem } from "@/utils.ts";

interface GameDataProps {
  fieldName: keyof ScopeAndSequenceLevel;
  items: unknown[];
  onItemsChange: (newValue: unknown[]) => void;
  showAddButton?: boolean;
}
export default function GameData({
  fieldName,
  items,
  onItemsChange,
  showAddButton = false,
}: GameDataProps) {
  const renderField = () => {
    if (!items || !Array.isArray(items)) {
      return <p>No data available</p>;
    }

    switch (fieldName) {
      case "newCode":
      case "cumulativeCode":
        return renderItemList(items, "spelling");

      case "newMorphemes":
      case "cumulativeMorphemes":
        return renderItemList(items, "morpheme");

      case "wordSets":
      case "wordChains":
        return renderItemList(items, "word");

      case "morphemeWordSets":
        return renderItemList(items, "word");

      case "sentences":
        return renderItemList(items, "sentence");

      case "trickyWords":
        return renderItemList(items);

      default:
        return <p>Unsupported field</p>;
    }
  };

  function renderItemList<T>(items: T[], displayKey?: string) {
    return (
      <>
        {items.map((item, index) => (
          <GameDataItem
            key={index}
            value={(displayKey ? item[displayKey as keyof T] : item) as string}
            fieldName={fieldName}
            item={item}
            onItemChange={(newItem) =>
              newItem
                ? onItemsChange(
                    items.map((i, iIndex) => (iIndex === index ? newItem : i))
                  )
                : onItemsChange(items.filter((_, iIndex) => iIndex !== index))
            }
            showDeleteButton
          />
        ))}
        {showAddButton && (
          <GameDataItem
            value="+"
            fieldName={fieldName}
            item={createGameItem(fieldName)}
            onItemChange={(newItem) =>
              newItem && onItemsChange([...items, newItem])
            }
          />
        )}
      </>
    );
  }

  return <GameDataContainer>{renderField()}</GameDataContainer>;
}

const GameDataContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;
