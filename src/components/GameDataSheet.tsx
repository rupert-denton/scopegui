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
import styled from "styled-components";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface GameDataSheetProps {
  levelId: number;
  item: unknown;
  children?: React.ReactNode;
}
export default function CodeSheet({
  levelId,
  item,
  children,
}: GameDataSheetProps) {
  const { updatedScopeAndSequence, updateLevel } = useScopeAndSequence();
  const level = updatedScopeAndSequence?.data.find(
    (level) => level.id === levelId
  );

  // Tricky word state
  const [updatedTrickyWord, setUpdatedTrickyWord] = useState<string>("");

  function renderSheetContents(item: unknown) {
    if (typeof item === "string") {
      if (!updatedTrickyWord) setUpdatedTrickyWord(item);
      return renderTrickyWordSheetContents(item);
    } else if ((item as Code).spelling) {
      return renderCodeSheetContents(item as Code);
    } else if ((item as Morpheme).morpheme) {
      return renderMorphemeSheetContents(item as Morpheme);
    } else if ((item as SentenceItem).sentence) {
      return renderSentenceSheetContents(item as SentenceItem);
    } else if ((item as WordItem | MorphemeWord).word) {
      if ((item as WordItem).phonemes) {
        return renderWordSheetContents(item as WordItem);
      } else if ((item as MorphemeWord).morphemes) {
        return renderMorphemeWordSheetContents(item as MorphemeWord);
      }
    }
  }

  function renderTrickyWordSheetContents(trickyWord: string) {
    function saveTrickyWordChanges() {
      if (!level) return;
      const newTrickyWords = level.trickyWords.map((word) =>
        word === trickyWord ? updatedTrickyWord : word
      );
      updateLevel(levelId, { trickyWords: newTrickyWords });
    }

    return (
      <>
        <SheetTitle>Tricky Word</SheetTitle>
        <SheetDescription>Edit a tricky word.</SheetDescription>
        <SheetContentContainer>
          <Input
            className="mt-4 mb-4"
            value={updatedTrickyWord}
            onChange={(e) => setUpdatedTrickyWord(e.target.value)}
          />
        </SheetContentContainer>
        <SheetFooter>
          <SheetClose asChild>
            <Button onClick={saveTrickyWordChanges}>Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </>
    );
  }

  function renderCodeSheetContents(code: Code) {
    return (
      <SheetContentContainer>
        <SheetTitle>Code</SheetTitle>
        <SheetDescription>Edit a code item.</SheetDescription>
        <p>{code.spelling}</p>
      </SheetContentContainer>
    );
  }

  function renderMorphemeSheetContents(morpheme: Morpheme) {
    return (
      <SheetContentContainer>
        <SheetTitle>Morpheme</SheetTitle>
        <SheetDescription>Edit a morpheme.</SheetDescription>
        <p>{morpheme.morpheme}</p>
      </SheetContentContainer>
    );
  }

  function renderWordSheetContents(word: WordItem) {
    return (
      <SheetContentContainer>
        <SheetTitle>Word Item</SheetTitle>
        <SheetDescription>Edit a word item.</SheetDescription>
        <p>{word.word}</p>
      </SheetContentContainer>
    );
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

  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent>{renderSheetContents(item)}</SheetContent>
    </Sheet>
  );
}

const SheetContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
`;
