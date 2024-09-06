import styled, { keyframes } from "styled-components";
import { useState } from "react";
import { Button } from "./ui/button";
import { Plus, RefreshCcw } from "lucide-react";

export default function ActionGroup() {
  const [isSpinning, setIsSpinning] = useState(false);

  const handleRefreshClick = () => {
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 800);
  };

  return (
    <ActionGroupContainer>
      <Button variant="outline" className="gap-2">
        <Plus size={16} />
        Add Level
      </Button>
      <Button variant="outline" className="gap-2" onClick={handleRefreshClick}>
        <SpinningIcon size={16} className={isSpinning ? "spinning" : ""} />
        Reassign Cumulative Items
      </Button>
    </ActionGroupContainer>
  );
}

const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const SpinningIcon = styled(RefreshCcw)`
  &.spinning {
    animation: ${spinAnimation} 0.8s linear infinite;
  }
`;

const ActionGroupContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
`;
