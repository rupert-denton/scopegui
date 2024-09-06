import useScopeAndSequence from "@/hooks/useScopeAndSequence";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ScopeAndSequenceLevel } from "@/model";
import { getNextId } from "@/utils";
import { useState } from "react";
import styled from "styled-components";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import GamesSelector from "../GamesSelector";
import FocusSelector from "../FocusSelector";

interface NewLevelDialogProps {
  children?: React.ReactNode;
}
export default function NewLevelDialog({ children }: NewLevelDialogProps) {
  const { updatedScopeAndSequence } = useScopeAndSequence();
  const [newLevel, setNewLevel] = useState<ScopeAndSequenceLevel>({
    id: getNextId(updatedScopeAndSequence?.data || []),
    level: (updatedScopeAndSequence?.data.length || 0) + 1,
    tier: 1,
    levelInfo: "",
    games: [],
    focus: "phonics",

    newCode: [],
    newMorphemes: [],
    cumulativeCode: [],
    cumulativeMorphemes: [],
    wordSets: [],
    morphemeWordSets: [],
    wordChains: [],
    sentences: [],
    trickyWords: [],
  });

  function handleSave() {
    console.log("Save new level...");
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Level</DialogTitle>
          <DialogDescription>
            ID: {newLevel.id} Level: {newLevel.level}
          </DialogDescription>
          <NewLevelFormContainer>
            <Label htmlFor="tier" className="mt-4">
              Tier
            </Label>
            <Input
              id="tier"
              className="mt-2"
              type="number"
              value={newLevel.tier}
              onChange={(e) =>
                setNewLevel({ ...newLevel, tier: parseInt(e.target.value) })
              }
            />

            <Label htmlFor="levelInfo" className="mt-4">
              Level Info
            </Label>
            <Input
              id="levelInfo"
              className="mt-2"
              placeholder="Level Info"
              value={newLevel.levelInfo}
              onChange={(e) =>
                setNewLevel({ ...newLevel, levelInfo: e.target.value })
              }
            />

            <Label htmlFor="games" className="mt-4">
              Games
            </Label>
            <GamesSelectorWrapper className="mt-2">
              <GamesSelector
                value={newLevel.games}
                onChange={(games) => setNewLevel({ ...newLevel, games })}
              />
            </GamesSelectorWrapper>

            <Label htmlFor="focus" className="mt-4">
              Focus
            </Label>
            <div className="mt-2 w-full">
              <FocusSelector
                value={newLevel.focus}
                onChange={(focus) => setNewLevel({ ...newLevel, focus })}
              />
            </div>

            <Label htmlFor="newCode" className="mt-4">
              New Code
            </Label>

            <Label htmlFor="newMorphemes" className="mt-4">
              New Morphemes
            </Label>

            <Label htmlFor="wordSets" className="mt-4">
              Word Sets
            </Label>

            <Label htmlFor="morphemeWordSets" className="mt-4">
              Morpheme Word Sets
            </Label>

            <Label htmlFor="wordChains" className="mt-4">
              Word Chains
            </Label>

            <Label htmlFor="sentences" className="mt-4">
              Sentences
            </Label>

            <Label htmlFor="trickyWords" className="mt-4">
              Tricky Words
            </Label>

            <Label htmlFor="extra" className="mt-4">
              Extra
            </Label>
          </NewLevelFormContainer>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={handleSave}>Save</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const NewLevelFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
`;

const GamesSelectorWrapper = styled.div`
  padding: 1rem;
  border: 1px solid hsl(var(--border));
  border-radius: 0.5rem;
`;
