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

interface LevelInfoProps {
  fieldName: string;
  value: number | string | string[] | boolean;
}
export default function LevelInfo({ fieldName, value }: LevelInfoProps) {
  if (Array.isArray(value)) {
    return (
      <LevelInfoContainer>
        {value.map((item, index) => (
          <GameDataItem key={index} value={item} />
        ))}
      </LevelInfoContainer>
    );
  } else if (fieldName === "id") {
    return <p>{value}</p>;
  } else if (fieldName === "focus") {
    return (
      <Select value={value as string}>
        <SelectTrigger>
          <SelectValue placeholder={value as string} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="phonics">phonics</SelectItem>
          <SelectItem value="morphology">morphology</SelectItem>
        </SelectContent>
      </Select>
    );
  } else if (typeof value === "string" || typeof value === "number") {
    return <Input value={value} />;
  } else if (typeof value === "boolean") {
    return <Checkbox checked={value} />;
  }
}

const LevelInfoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;
