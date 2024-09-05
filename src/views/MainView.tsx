import styled from "styled-components";
import FileSelector from "../components/FileSelector";
import Level from "../components/Level";
import useScopeAndSequence from "../hooks/useScopeAndSequence";
export default function MainView() {
  const { scopeAndSequence } = useScopeAndSequence();

  if (!scopeAndSequence) {
    return (
      <>
        <p>No scope and sequence loaded.</p>
        <FileSelector />
      </>
    );
  }

  return (
    <LevelList>
      {scopeAndSequence.data.map((levelData) => (
        <Level key={levelData.id} levelData={levelData} />
      ))}
    </LevelList>
  );
}

const LevelList = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  gap: 0.1rem;
  width: 100%;
`;
