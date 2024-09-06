import styled from "styled-components";
import GameDataItem from "./GameDataItem";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import useScopeAndSequence from "@/hooks/useScopeAndSequence";
import GamesSelector from "./GamesSelector";
import FocusSelector from "./FocusSelector";

interface LevelInfoProps {
  levelId: number;
  fieldName: string;
  value: number | string | string[] | boolean;
}
export default function LevelInfo({
  levelId,
  fieldName,
  value,
}: LevelInfoProps) {
  const { updateLevel } = useScopeAndSequence();

  if (fieldName === "id" || fieldName === "level") {
    return <p>{value}</p>;
  } else if (fieldName === "games") {
    return (
      <GamesSelector
        value={value as string[]}
        onChange={(newValue) => updateLevel(levelId, { games: newValue })}
      />
    );
  } else if (Array.isArray(value)) {
    return (
      <LevelInfoContainer>
        {value.map((item, index) => (
          <GameDataItem key={index} value={item} />
        ))}
      </LevelInfoContainer>
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

const LevelInfoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;
