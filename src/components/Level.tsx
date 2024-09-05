import styled from "styled-components";
import { ScopeAndSequenceLevel } from "../model";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DotsSixVertical } from "@phosphor-icons/react";

interface LevelProps {
  levelData: ScopeAndSequenceLevel;
}
export default function Level({ levelData }: LevelProps) {
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
      <DragHandle size={20} {...attributes} {...listeners} />
      <p>
        {levelData.level} - {levelData.levelInfo} ({levelData.id})
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
  align-items: center;
`;

const DragHandle = styled(DotsSixVertical)`
  cursor: grab;
  margin-right: 10px;

  &:active {
    cursor: grabbing;
  }
`;
