import { Outlet } from "react-router-dom";
import styled from "styled-components";
import useScopeAndSequence from "../hooks/useScopeAndSequence";
import VersionSelector from "../components/VersionSelector";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function MainLayout() {
  const { scopeAndSequence, saveScopeAndSequence, unloadScopeAndSequence } =
    useScopeAndSequence();

  function handleUnload() {
    if (
      window.confirm(
        "Are you sure you want to unload? Any unsaved changes will be lost."
      )
    ) {
      unloadScopeAndSequence();
    }
  }

  return (
    <MainLayoutContainer>
      <Header>
        <PageTitle>Scope And Sequence Editor</PageTitle>
        {scopeAndSequence && (
          <StatusContainer>
            <VersionSelector />
            <Button onClick={saveScopeAndSequence}>
              <Download size={16} />
              Save
            </Button>
            <Button variant="destructive" onClick={handleUnload}>
              Unload
            </Button>
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

const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
`;

const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
