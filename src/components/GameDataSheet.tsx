import { Code, Morpheme, MorphemeWord, SentenceItem, WordItem } from "@/model";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { useState } from "react";
import useScopeAndSequence from "@/hooks/useScopeAndSequence";
import { Button } from "./ui/button";
import TrickyWordSheetContents from "./SheetContents/TrickyWordSheetContents";
import CodeSheetContents from "./SheetContents/CodeSheetContents";
import MorphemeSheetContents from "./SheetContents/MorphemeSheetContents";
import WordItemSheetContents from "./SheetContents/WordItemSheetContents";
import SheetContentContainer from "./SheetContents/SheetContentContainer";
import SentenceSheetContents from "./SheetContents/SentenceSheetContents";
import MorphemeWordSheetContents from "./SheetContents/MorphemeWordSheetContents";

interface GameDataSheetProps {
  levelId: number;
  fieldName: string;
  item: unknown;
  index: number;
  children?: React.ReactNode;
}
export default function CodeSheet({
  levelId,
  fieldName,
  item,
  index,
  children,
}: GameDataSheetProps) {
  const { updatedScopeAndSequence, updateLevel } = useScopeAndSequence();
  const level = updatedScopeAndSequence?.data.find(
    (level) => level.id === levelId
  );

  const [updatedCode, setUpdatedCode] = useState<Code | null>(null);
  const [updatedMorpheme, setUpdatedMorpheme] = useState<Morpheme | null>(null);
  const [updatedWordItem, setUpdatedWordItem] = useState<WordItem | null>(null);
  const [updatedMorphemeWord, setUpdatedMorphemeWord] =
    useState<MorphemeWord | null>(null);
  const [updatedSentence, setUpdatedSentence] = useState<SentenceItem | null>(
    null
  );
  const [updatedTrickyWord, setUpdatedTrickyWord] = useState<string | null>(
    null
  );

  function saveChanges() {
    if (!level) return;

    const newLevel = { ...level };

    switch (fieldName) {
      case "newCode":
      case "cumulativeCode":
        if (!updatedCode) return;
        newLevel[fieldName][index] = updatedCode;
        break;
      case "newMorphemes":
      case "cumulativeMorphemes":
        if (!updatedMorpheme) return;
        newLevel[fieldName][index] = updatedMorpheme;
        break;
      case "wordSets":
      case "wordChains":
        if (!updatedWordItem) return;
        newLevel[fieldName][index] = updatedWordItem;
        break;
      case "morphemeWordSets":
        if (!updatedMorphemeWord) return;
        newLevel[fieldName][index] = updatedMorphemeWord;
        break;
      case "sentences":
        if (!updatedSentence) return;
        newLevel[fieldName][index] = updatedSentence;
        break;
      case "trickyWords":
        if (!updatedTrickyWord) return;
        newLevel[fieldName][index] = updatedTrickyWord;
        break;
      default:
        return;
    }

    updateLevel(levelId, newLevel);
  }

  function renderSheetContents(item: unknown) {
    switch (fieldName) {
      case "newCode":
      case "cumulativeCode":
        if (!updatedCode) setUpdatedCode(item as Code);
        return (
          <CodeSheetContents
            updatedCode={updatedCode}
            setUpdatedCode={setUpdatedCode}
          />
        );

      case "newMorphemes":
      case "cumulativeMorphemes":
        if (!updatedMorpheme) setUpdatedMorpheme(item as Morpheme);
        return (
          <MorphemeSheetContents
            updatedMorpheme={updatedMorpheme}
            setUpdatedMorpheme={setUpdatedMorpheme}
          />
        );

      case "wordSets":
      case "wordChains":
        if (!updatedWordItem) setUpdatedWordItem(item as WordItem);
        return (
          <WordItemSheetContents
            updatedWordItem={updatedWordItem}
            setUpdatedWordItem={setUpdatedWordItem}
          />
        );

      case "morphemeWordSets":
        if (!updatedMorphemeWord) setUpdatedMorphemeWord(item as MorphemeWord);
        return (
          <MorphemeWordSheetContents
            updatedMorphemeWord={updatedMorphemeWord}
            setUpdatedMorphemeWord={setUpdatedMorphemeWord}
          />
        );

      case "sentences":
        if (!updatedSentence) setUpdatedSentence(item as SentenceItem);
        return (
          <SentenceSheetContents
            updatedSentence={updatedSentence}
            setUpdatedSentence={setUpdatedSentence}
          />
        );

      case "trickyWords":
        if (!updatedTrickyWord) setUpdatedTrickyWord(item as string);
        return (
          <TrickyWordSheetContents
            updatedTrickyWord={updatedTrickyWord}
            setUpdatedTrickyWord={setUpdatedTrickyWord}
          />
        );

      default:
        return undefined;
    }
  }

  return (
    <Sheet
      onOpenChange={(open) => {
        if (!open) {
          setUpdatedCode(null);
          setUpdatedMorpheme(null);
          setUpdatedWordItem(null);
          setUpdatedMorphemeWord(null);
          setUpdatedSentence(null);
          setUpdatedTrickyWord(null);
        }
      }}
    >
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent>
        {renderSheetContents(item) || (
          <SheetContentContainer>
            <SheetTitle>Unsupported Field</SheetTitle>
            <SheetDescription>
              The field type {fieldName} isn't supported yet.
            </SheetDescription>
          </SheetContentContainer>
        )}

        <SheetFooter className="flex gap-2">
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
          <SheetClose asChild>
            <Button onClick={saveChanges}>Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
