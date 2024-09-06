import styled from "styled-components";
import GameDataItem from "./GameDataItem";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import useScopeAndSequence from "@/hooks/useScopeAndSequence";

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
      <Select
        value={value as string}
        onValueChange={(newValue) => updateLevel(levelId, { focus: newValue })}
      >
        <SelectTrigger>
          <SelectValue placeholder={value as string} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="phonics">phonics</SelectItem>
          <SelectItem value="morphology">morphology</SelectItem>
        </SelectContent>
      </Select>
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
