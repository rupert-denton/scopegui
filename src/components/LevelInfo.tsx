import styled from "styled-components";
import GameDataItem from "./GameDataItem";

interface LevelInfoProps {
  value: number | string | string[] | boolean;
}
export default function LevelInfo({ value }: LevelInfoProps) {
  if (Array.isArray(value)) {
    return (
      <LevelInfoContainer>
        {value.map((item, index) => (
          <GameDataItem key={index} value={item} />
        ))}
      </LevelInfoContainer>
    );
  } else if (typeof value === "string" || typeof value === "number") {
    return value;
  } else if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }
}

const LevelInfoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;
