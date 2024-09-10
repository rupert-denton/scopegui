import styled, { keyframes } from "styled-components";
import { useState } from "react";
import { Button } from "./ui/button";
import { Info, Plus, RefreshCcw } from "lucide-react";
import useScopeAndSequence from "@/hooks/useScopeAndSequence";
import {
  assignLevelNumbers,
  getNewLevel,
  getNextId,
  reassignCumulativeItems,
} from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export default function ActionGroup() {
  const { updatedScopeAndSequence, setUpdatedData } = useScopeAndSequence();
  const [isSpinning, setIsSpinning] = useState(false);

  function handleAddLevel() {
    if (!updatedScopeAndSequence) return;

    const newLevel = getNewLevel(getNextId(updatedScopeAndSequence.data));

    setUpdatedData(
      reassignCumulativeItems(
        assignLevelNumbers([newLevel, ...updatedScopeAndSequence.data])
      )
    );
  }

  function handleReassignCumulativeCode() {
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 800);

    if (updatedScopeAndSequence) {
      setUpdatedData(reassignCumulativeItems(updatedScopeAndSequence.data));
    }
  }

  return (
    <ActionGroupContainer>
      <Button variant="outline" className="gap-2" onClick={handleAddLevel}>
        <Plus size={16} />
        Add Level
      </Button>
      <Button
        variant="outline"
        className="gap-2"
        onClick={handleReassignCumulativeCode}
      >
        <SpinningIcon size={16} className={isSpinning ? "spinning" : ""} />
        Reassign Cumulative Items
        <Tooltip>
          <TooltipTrigger asChild>
            <Info size={14} />
          </TooltipTrigger>
          <TooltipContent>
            <p>
              Cumulative items will be reassigned automatically when <br />
              you add or remove a level, otherwise use this button.
            </p>
          </TooltipContent>
        </Tooltip>
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
