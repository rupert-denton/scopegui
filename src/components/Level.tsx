import styled from "styled-components";
import { ScopeAndSequenceLevel } from "../model";

interface LevelProps {
  levelData: ScopeAndSequenceLevel;
}
export default function Level({ levelData }: LevelProps) {
  return (
    <LevelContainer>
      <p>
        {levelData.level} - {levelData.levelInfo}
      </p>
    </LevelContainer>
  );
}

const LevelContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  padding: 0.5rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
