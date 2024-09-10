import { Code } from "@/lib/model";
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
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import GameDataItem from "./GameDataItem";
import styled from "styled-components";
import useGameDataSheet from "@/hooks/useGameDataSheet";

interface CodeSelectorProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onCodeSelected: (code: Code) => void;
  children?: React.ReactNode;
}
export default function CodeSelector({
  open,
  setOpen,
  onCodeSelected,
  children,
}: CodeSelectorProps) {
  const { updatedScopeAndSequence } = useScopeAndSequence();
  const { level } = useGameDataSheet();
  const codeByLevel = (updatedScopeAndSequence?.data || []).map(
    (level) => level.newCode
  );

  function handleCodeSelected(code: Code) {
    onCodeSelected(code);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className="p-2 m-w-50">
        <Command>
          <CommandInput placeholder="Search for code..." />
          <CommandList>
            <CommandEmpty>No code found.</CommandEmpty>
            {level && codeByLevel[level - 1].length ? (
              <LevelGroup
                level={level}
                codeForLevel={codeByLevel[level - 1]}
                handleCodeSelected={handleCodeSelected}
                isCurrent
              />
            ) : null}
            {codeByLevel.map((code, index) => {
              if (!code.length) return null;
              return (
                <LevelGroup
                  key={index}
                  level={index + 1}
                  codeForLevel={codeByLevel[index]}
                  handleCodeSelected={handleCodeSelected}
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
  codeForLevel: Code[];
  handleCodeSelected: (code: Code) => void;
  isCurrent?: boolean;
}
function LevelGroup({
  level,
  codeForLevel,
  handleCodeSelected,
  isCurrent,
}: LevelGroupProps) {
  const getSearchKey = (code: Code) =>
    `${isCurrent ? "Current level" : ""} ${level} ${code.spelling} ${
      code.phoneme
    }`;
  return (
    <>
      <CommandGroup heading={`${isCurrent ? "Current -" : ""} Level ${level}`}>
        <ItemsContainer>
          {codeForLevel.map((code, index) => (
            <CommandItem key={index} value={getSearchKey(code)}>
              <Tooltip>
                <TooltipTrigger onClick={() => handleCodeSelected(code)}>
                  <GameDataItem value={code.spelling} />
                </TooltipTrigger>
                <TooltipContent>
                  <div>/{code.phoneme}/</div>
                </TooltipContent>
              </Tooltip>
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
