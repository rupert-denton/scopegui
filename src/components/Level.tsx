import styled from "styled-components";
import { ScopeAndSequenceLevel } from "../lib/model";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CaretRight, DotsSixVertical } from "@phosphor-icons/react";
import { useState } from "react";
import LevelContent from "./LevelContent";
import useScopeAndSequence from "@/hooks/useScopeAndSequence";
import { assignLevelNumbers, reassignCumulativeItems } from "@/lib/utils";
import { Trash2 } from "lucide-react";

interface LevelProps {
  levelData: ScopeAndSequenceLevel;
}
export default function Level({ levelData }: LevelProps) {
  const { updatedScopeAndSequence, setUpdatedData } = useScopeAndSequence();
  const [open, setOpen] = useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: levelData.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  function handleDeleteLevel() {
    if (!updatedScopeAndSequence) return;
    if (
      window.confirm(
        `Are you sure you want to delete Level ${levelData.level}?`
      )
    ) {
      const updatedData = [...updatedScopeAndSequence.data].filter(
        (level) => level.id !== levelData.id
      );
      setUpdatedData(reassignCumulativeItems(assignLevelNumbers(updatedData)));
    }
  }

  return (
    <LevelContainer ref={setNodeRef} style={style}>
      <ControlsContainer>
        <DragHandle size={20} {...attributes} {...listeners} />
        <Chevron
          weight="bold"
          style={{ transform: open ? "rotate(90deg)" : undefined }}
          onClick={() => setOpen(!open)}
        />
      </ControlsContainer>
      <LevelHeader>
        <span>
          Level {levelData.level} - {levelData.levelInfo}{" "}
          <em>(Level ID: {levelData.id})</em>
        </span>
        {open && (
          <div className="mr-4 cursor-pointer" onClick={handleDeleteLevel}>
            <Trash2 size={20} color={"hsl(var(--destructive))"} />
          </div>
        )}
      </LevelHeader>
      {open && <LevelContent levelData={levelData} />}
    </LevelContainer>
  );
}

const LevelContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  padding: 0.5rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const DragHandle = styled(DotsSixVertical)`
  cursor: grab;
  margin-right: 10px;

  &:active {
    cursor: grabbing;
  }
`;

const ControlsContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  top: 0.6rem;
`;

const Chevron = styled(CaretRight)`
  cursor: pointer;
  margin-right: 10px;

  will-change: transform;
  transition: transform 0.2s ease-in-out;
`;

const LevelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 4rem;
`;
