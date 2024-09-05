import styled from "styled-components";
import useScopeAndSequence from "../hooks/useScopeAndSequence";
import Level from "./Level";

export default function LevelList() {
  const { updatedScopeAndSequence } = useScopeAndSequence();

  if (!updatedScopeAndSequence) {
    return <p>No scope and sequence loaded.</p>;
  }
  return (
    <LevelListContainer>
      {updatedScopeAndSequence.data.map((levelData) => (
        <Level key={levelData.id} levelData={levelData} />
      ))}
    </LevelListContainer>
  );
}

const LevelListContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  gap: 0.1rem;
  width: 100%;
`;
