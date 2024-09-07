import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import useScopeAndSequence from "@/hooks/useScopeAndSequence";
import GamesSelector from "./GamesSelector";
import FocusSelector from "./FocusSelector";
import GameDataItem from "./GameDataItem";
import GameItemsContainer from "./GameItemsContainer";

interface LevelInfoProps {
  levelId: number;
  fieldName: string;
  value: number | string | string[] | boolean;
  showAddButton?: boolean;
}
export default function LevelInfo({
  levelId,
  fieldName,
  value,
  showAddButton,
}: LevelInfoProps) {
  const { updateLevel } = useScopeAndSequence();

  function handleExtraChange(index: number, updated: string | null) {
    if (Array.isArray(value)) {
      if (updated) {
        if (index >= value.length) {
          updateLevel(levelId, { extra: [...value, updated] });
        } else {
          updateLevel(levelId, {
            extra: value.map((item, i) => (i === index ? updated : item)),
          });
        }
      } else {
        updateLevel(levelId, {
          extra: value.filter((_, i) => i !== index),
        });
      }
    } else if (typeof value === "string") {
      if (updated) {
        updateLevel(levelId, { extra: [updated] });
      } else {
        updateLevel(levelId, { extra: [] });
      }
    } else {
      console.error("Invalid value type for extra field");
    }
  }

  if (fieldName === "id" || fieldName === "level") {
    return <p>{value}</p>;
  } else if (fieldName === "games") {
    return (
      <GamesSelector
        value={value as string[]}
        onChange={(newValue) => updateLevel(levelId, { games: newValue })}
      />
    );
  } else if (fieldName === "extra") {
    return (
      <GameItemsContainer>
        {(Array.isArray(value) ? value : [value]).map((v, index) => (
          <GameDataItem
            key={index}
            value={v as string}
            fieldName="extra"
            item={v}
            onItemChange={(newValue) =>
              handleExtraChange(index, newValue as string | null)
            }
            showDeleteButton
          />
        ))}
        {showAddButton && (
          <GameDataItem
            value="+"
            fieldName={fieldName}
            item={""}
            onItemChange={(newItem) =>
              handleExtraChange(
                Array.isArray(value) ? value.length : 0,
                newItem as string | null
              )
            }
          />
        )}
      </GameItemsContainer>
    );
  } else if (fieldName === "focus") {
    return (
      <FocusSelector
        value={value as string}
        onChange={(newValue) => updateLevel(levelId, { focus: newValue })}
      />
    );
  } else if (typeof value === "string") {
    return (
      <Input
        value={value}
        onChange={(e) => updateLevel(levelId, { [fieldName]: e.target.value })}
      />
    );
  } else if (typeof value === "number") {
    return (
      <Input
        value={value}
        type="number"
        onChange={(e) =>
          updateLevel(levelId, { [fieldName]: parseInt(e.target.value) })
        }
      />
    );
  } else if (typeof value === "boolean") {
    return (
      <Checkbox
        checked={value}
        onCheckedChange={(newChecked) =>
          updateLevel(levelId, { [fieldName]: newChecked })
        }
      />
    );
  }
}
