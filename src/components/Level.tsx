import styled from "styled-components";
import { ScopeAndSequenceLevel } from "../model";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CaretRight, DotsSixVertical } from "@phosphor-icons/react";
import { useState } from "react";
import LevelContent from "./LevelContent";

interface LevelProps {
  levelData: ScopeAndSequenceLevel;
}
export default function Level({ levelData }: LevelProps) {
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
        Level {levelData.level} - {levelData.levelInfo}{" "}
        <em>(Level ID: {levelData.id})</em>
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
  flex: 1;
  margin-left: 4rem;
`;
