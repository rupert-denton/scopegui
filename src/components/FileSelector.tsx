import styled from "styled-components";
import useScopeAndSequence from "../hooks/useScopeAndSequence";

export default function FileSelector() {
  const { loadScopeAndSequence } = useScopeAndSequence();

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      loadScopeAndSequence(file);
    }
  }

  return (
    <FileSelectorContainer>
      <p>No scope and sequence loaded.</p>
      <input type="file" onChange={handleFileChange} />
    </FileSelectorContainer>
  );
}

const FileSelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-top: 1.8rem;
`;
