import { Morpheme } from "@/lib/model";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import useScopeAndSequence from "@/hooks/useScopeAndSequence";
import GameDataItem from "./GameDataItem";
import styled from "styled-components";
import useGameDataSheet from "@/hooks/useGameDataSheet";
import { useState } from "react";

interface MorphemeSelectorProps {
  onMorphemeSelected: (morpheme: Morpheme) => void;
  children?: React.ReactNode;
}
export default function MorphemeSelector({
  onMorphemeSelected,
  children,
}: MorphemeSelectorProps) {
  const [open, setOpen] = useState(false);
  const { updatedScopeAndSequence } = useScopeAndSequence();
  const { level } = useGameDataSheet();
  const morphemesByLevel = (updatedScopeAndSequence?.data || []).map(
    (level) => level.newMorphemes
  );

  function handleMorphemeSelected(morpheme: Morpheme) {
    onMorphemeSelected(morpheme);
    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className="p-2 m-w-50">
        <Command>
          <CommandInput placeholder="Search for a morpheme..." />
          <CommandList>
            <CommandEmpty>No morphemes found.</CommandEmpty>
            {level && morphemesByLevel[level - 1].length ? (
              <LevelGroup
                level={level}
                morphemesForLevel={morphemesByLevel[level - 1]}
                onMorphemeSelected={handleMorphemeSelected}
                isCurrent
              />
            ) : null}
            {morphemesByLevel.map((morphemes, index) => {
              if (!morphemes.length) return null;
              return (
                <LevelGroup
                  key={index}
                  level={index + 1}
                  morphemesForLevel={morphemes}
                  onMorphemeSelected={handleMorphemeSelected}
                />
              );
            })}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

interface LevelGroupProps {
  level: number;
  morphemesForLevel: Morpheme[];
  onMorphemeSelected: (morpheme: Morpheme) => void;
  isCurrent?: boolean;
}
function LevelGroup({
  level,
  morphemesForLevel,
  onMorphemeSelected,
  isCurrent,
}: LevelGroupProps) {
  const getSearchKey = (morpheme: Morpheme) =>
    `${isCurrent ? "Current level" : ""} ${level} ${morpheme.morpheme} ${
      morpheme.pronunciation ? morpheme.pronunciation : ""
    }`;
  return (
    <>
      <CommandGroup heading={`${isCurrent ? "Current -" : ""} Level ${level}`}>
        <ItemsContainer>
          {morphemesForLevel.map((morpheme, index) => (
            <CommandItem
              key={index}
              value={getSearchKey(morpheme)}
              onSelect={() => onMorphemeSelected(morpheme)}
            >
              <GameDataItem value={morpheme.morpheme} />
            </CommandItem>
          ))}
        </ItemsContainer>
      </CommandGroup>
      <CommandSeparator />
    </>
  );
}

const ItemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
