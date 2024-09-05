import { Outlet } from "react-router-dom";
import styled from "styled-components";
import useScopeAndSequence from "../hooks/useScopeAndSequence";
import VersionSelector from "../components/VersionSelector";

export default function MainLayout() {
  const { scopeAndSequence, saveScopeAndSequence, unloadScopeAndSequence } =
    useScopeAndSequence();

  return (
    <MainLayoutContainer>
      <Header>
        <h1>Scope And Sequence Editor</h1>
        {scopeAndSequence && (
          <StatusContainer>
            <VersionSelector />
            <button onClick={saveScopeAndSequence}>Save</button>
            <button onClick={unloadScopeAndSequence}>Unload</button>
          </StatusContainer>
        )}
      </Header>
      <Outlet />
    </MainLayoutContainer>
  );
}

const MainLayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
