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
import {
  Code,
  Morpheme,
  MorphemeWord,
  ScopeAndSequenceLevel,
  SentenceItem,
  WordItem,
} from "@/model";
import {
  assignLevelNumbers,
  getNextId,
  reassignCumulativeItems,
} from "@/utils";
import { useState } from "react";
import styled from "styled-components";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import GamesSelector from "../GamesSelector";
import FocusSelector from "../FocusSelector";
import GameData from "../GameData";
import { ScrollArea } from "../ui/scroll-area";
import { X } from "lucide-react";

interface NewLevelDialogProps {
  children?: React.ReactNode;
}
export default function NewLevelDialog({ children }: NewLevelDialogProps) {
  const { updatedScopeAndSequence, setUpdatedData } = useScopeAndSequence();
  const [newLevel, setNewLevel] = useState<ScopeAndSequenceLevel>({
    id: getNextId(updatedScopeAndSequence?.data || []),
    level: (updatedScopeAndSequence?.data.length || 0) + 1,
    tier: 1,
    levelInfo: "",
    games: [],
    focus: "phonics",
    extra: [],

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
    if (!updatedScopeAndSequence) return;

    const updatedData = updatedScopeAndSequence.data.reduce((acc, level) => {
      if (level.level === newLevel.level) {
        return [...acc, newLevel, level];
      }
      return [...acc, level];
    }, [] as ScopeAndSequenceLevel[]);

    setUpdatedData(reassignCumulativeItems(assignLevelNumbers(updatedData)));
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-w-2xl overflow-visible">
        <DialogHeader>
          <DialogTitle>New Level</DialogTitle>
          <DialogDescription>ID: {newLevel.id}</DialogDescription>
        </DialogHeader>
        <NewLevelFormContainer>
          <div className="px-2 pb-4 mr-4">
            <Label htmlFor="level">Level</Label>
            <Input
              id="level"
              className="mt-1 mb-2"
              type="number"
              value={newLevel.level}
              onChange={(e) =>
                setNewLevel({ ...newLevel, level: parseInt(e.target.value) })
              }
            />

            <Label htmlFor="tier">Tier</Label>
            <Input
              id="tier"
              className="mt-1 mb-2"
              type="number"
              value={newLevel.tier}
              onChange={(e) =>
                setNewLevel({ ...newLevel, tier: parseInt(e.target.value) })
              }
            />

            <Label htmlFor="levelInfo">Level Info</Label>
            <Input
              id="levelInfo"
              className="mt-1 mb-2"
              placeholder="Level Info"
              value={newLevel.levelInfo}
              onChange={(e) =>
                setNewLevel({ ...newLevel, levelInfo: e.target.value })
              }
            />

            <Label htmlFor="games">Games</Label>
            <ContentWrapper className="mt-1 mb-2">
              <GamesSelector
                value={newLevel.games}
                onChange={(games) => setNewLevel({ ...newLevel, games })}
              />
            </ContentWrapper>

            <Label htmlFor="focus">Focus</Label>
            <div className="mt-1 mb-2 w-full">
              <FocusSelector
                value={newLevel.focus}
                onChange={(focus) => setNewLevel({ ...newLevel, focus })}
              />
            </div>

            <Label htmlFor="newCode">New Code</Label>
            <ContentWrapper className="mt-1 mb-2">
              <GameData
                fieldName="newCode"
                items={newLevel.newCode}
                onItemsChange={(newCode) =>
                  setNewLevel({ ...newLevel, newCode: newCode as Code[] })
                }
                showAddButton
              />
            </ContentWrapper>

            <Label htmlFor="newMorphemes">New Morphemes</Label>
            <ContentWrapper className="mt-1 mb-2">
              <GameData
                fieldName="newMorphemes"
                items={newLevel.newMorphemes}
                onItemsChange={(newMorphemes) =>
                  setNewLevel({
                    ...newLevel,
                    newMorphemes: newMorphemes as Morpheme[],
                  })
                }
                showAddButton
              />
            </ContentWrapper>

            <Label htmlFor="wordSets">Word Sets</Label>
            <ContentWrapper className="mt-1 mb-2">
              <GameData
                fieldName="wordSets"
                items={newLevel.wordSets}
                onItemsChange={(wordSets) =>
                  setNewLevel({ ...newLevel, wordSets: wordSets as WordItem[] })
                }
                showAddButton
              />
            </ContentWrapper>

            <Label htmlFor="morphemeWordSets">Morpheme Word Sets</Label>
            <ContentWrapper className="mt-1 mb-2">
              <GameData
                fieldName="morphemeWordSets"
                items={newLevel.morphemeWordSets}
                onItemsChange={(morphemeWordSets) =>
                  setNewLevel({
                    ...newLevel,
                    morphemeWordSets: morphemeWordSets as MorphemeWord[],
                  })
                }
                showAddButton
              />
            </ContentWrapper>

            <Label htmlFor="wordChains">Word Chains</Label>
            <ContentWrapper className="mt-1 mb-2">
              <GameData
                fieldName="wordChains"
                items={newLevel.wordChains}
                onItemsChange={(wordChains) =>
                  setNewLevel({
                    ...newLevel,
                    wordChains: wordChains as WordItem[],
                  })
                }
                showAddButton
              />
            </ContentWrapper>

            <Label htmlFor="sentences">Sentences</Label>
            <ContentWrapper className="mt-1 mb-2">
              <GameData
                fieldName="sentences"
                items={newLevel.sentences}
                onItemsChange={(sentences) =>
                  setNewLevel({
                    ...newLevel,
                    sentences: sentences as SentenceItem[],
                  })
                }
                showAddButton
              />
            </ContentWrapper>

            <Label htmlFor="trickyWords">Tricky Words</Label>
            <ContentWrapper className="mt-1 mb-2">
              <GameData
                fieldName="trickyWords"
                items={newLevel.trickyWords}
                onItemsChange={(trickyWords) =>
                  setNewLevel({
                    ...newLevel,
                    trickyWords: trickyWords as string[],
                  })
                }
                showAddButton
              />
            </ContentWrapper>

            <Label htmlFor="extra">Extra</Label>
            {newLevel.extra.map((extra, index) => (
              <div key={index} className="relative mt-1">
                <Input
                  id={`extra-${index}`}
                  className="mt-2"
                  value={extra}
                  onChange={(e) => {
                    const updatedExtra = [...newLevel.extra];
                    updatedExtra[index] = e.target.value;
                    setNewLevel({ ...newLevel, extra: updatedExtra });
                  }}
                />
                <X
                  size={16}
                  className="absolute right-2 top-3 cursor-pointer"
                  onClick={() => {
                    const updatedExtra = newLevel.extra.filter(
                      (_, i) => i !== index
                    );
                    setNewLevel({ ...newLevel, extra: updatedExtra });
                  }}
                />
              </div>
            ))}
            <Input
              className="mt-2"
              value=""
              placeholder="Add extra"
              onChange={(e) =>
                setNewLevel({
                  ...newLevel,
                  extra: [...newLevel.extra, e.target.value],
                })
              }
            />
          </div>
        </NewLevelFormContainer>
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

const NewLevelFormContainer = styled(ScrollArea)`
  display: flex;
  flex-direction: column;
  max-height: 80vh;
`;

const ContentWrapper = styled.div`
  padding: 1rem;
  border: 1px solid hsl(var(--border));
  border-radius: 0.5rem;
`;
