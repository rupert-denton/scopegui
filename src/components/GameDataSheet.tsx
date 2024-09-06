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

  function renderMorphemeWordSheetContents(morphemeWord: MorphemeWord) {
    return (
      <SheetContentContainer>
        <SheetTitle>Morpheme Word</SheetTitle>
        <SheetDescription>Edit a morpheme word.</SheetDescription>
        <p>{morphemeWord.word}</p>
      </SheetContentContainer>
    );
  }

  function renderSentenceSheetContents(sentence: SentenceItem) {
    return (
      <SheetContentContainer>
        <SheetTitle>Sentence Item</SheetTitle>
        <SheetDescription>Edit a sentence item.</SheetDescription>
        <p>{sentence.sentence}</p>
      </SheetContentContainer>
    );
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
        return renderMorphemeWordSheetContents(item as MorphemeWord);

      case "sentences":
        if (!updatedSentence) setUpdatedSentence(item as SentenceItem);
        return renderSentenceSheetContents(item as SentenceItem);

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
