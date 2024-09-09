import { Code, ScopeAndSequenceLevel } from "../lib/model";
import GameDataItem from "./GameDataItem";
import { createGameItem } from "@/lib/utils";
import { GameItemsContainer } from "./StyledComponents";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

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
  function renderItemList<T>(items: T[], displayKey?: string) {
    return (
      <GameItemsContainer>
        {items.map((item, index) => (
          <Tooltip key={index}>
            <TooltipTrigger>
              <GameDataItem
                value={
                  (displayKey ? item[displayKey as keyof T] : item) as string
                }
                fieldName={fieldName}
                item={item}
                onItemChange={(newItem) =>
                  newItem
                    ? onItemsChange(
                        items.map((i, iIndex) =>
                          iIndex === index ? newItem : i
                        )
                      )
                    : onItemsChange(
                        items.filter((_, iIndex) => iIndex !== index)
                      )
                }
                showDeleteButton
              />
            </TooltipTrigger>
            {(fieldName === "newCode" || fieldName === "cumulativeCode") && (
              <TooltipContent>
                <div className="flex items-center gap-1">
                  {(Array.isArray((item as Code).phoneme)
                    ? ((item as Code).phoneme as string[])
                    : [(item as Code).phoneme]
                  ).map((phoneme, index) => (
                    <div key={index}>/{phoneme}/</div>
                  ))}
                </div>
              </TooltipContent>
            )}
          </Tooltip>
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
      </GameItemsContainer>
    );
  }

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
}
