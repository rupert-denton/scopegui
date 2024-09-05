import styled from "styled-components";
import useScopeAndSequence from "../hooks/useScopeAndSequence";
import Level from "./Level";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  MouseSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useState } from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export default function LevelList() {
  const { updatedScopeAndSequence, setUpdatedData } = useScopeAndSequence();
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const sensors = useSensors(useSensor(MouseSensor));

  function handleDragStart({ active }: DragStartEvent) {
    setActiveId(active.id);
  }

  function handleDragEnd({ over }: DragEndEvent) {
    if (!updatedScopeAndSequence) return;

    const overId = over?.id;
    if (!activeId || !overId || activeId === overId) {
      setActiveId(null);
      return;
    }

    const updatedData = [...updatedScopeAndSequence.data];
    const activeIndex = updatedData.findIndex((level) => level.id === activeId);
    const overIndex = updatedData.findIndex((level) => level.id === overId);
    const [removed] = updatedData.splice(activeIndex, 1);
    updatedData.splice(overIndex, 0, removed);

    setUpdatedData(updatedData);

    setActiveId(null);
  }

  function handleDragCancel() {
    setActiveId(null);
  }

  if (!updatedScopeAndSequence) {
    return <p>No scope and sequence loaded.</p>;
  }
  return (
    <LevelListContainer>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext
          items={updatedScopeAndSequence.data}
          strategy={verticalListSortingStrategy}
        >
          {updatedScopeAndSequence.data.map((levelData) => (
            <Level key={levelData.id} levelData={levelData} />
          ))}
        </SortableContext>
      </DndContext>
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
