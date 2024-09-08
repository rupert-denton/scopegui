import {
  Code,
  Morpheme,
  MorphemeWord,
  SentenceItem,
  WordItem,
} from "@/lib/model";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetTitle,
} from "./ui/sheet";
import { useState } from "react";
import { Button } from "./ui/button";
import TrickyWordSheetContents from "./SheetContents/TrickyWordSheetContents";
import CodeSheetContents from "./SheetContents/CodeSheetContents";
import MorphemeSheetContents from "./SheetContents/MorphemeSheetContents";
import WordItemSheetContents from "./SheetContents/WordItemSheetContents";
import { SheetContentContainer } from "./StyledComponents";
import SentenceSheetContents from "./SheetContents/SentenceSheetContents";
import MorphemeWordSheetContents from "./SheetContents/MorphemeWordSheetContents";
import useGameDataSheet from "@/hooks/useGameDataSheet";
import ExtraSheetContents from "./SheetContents/ExtraSheetContents";

interface GameDataSheetProps {
  children?: React.ReactNode;
}
export default function GameDataSheet({ children }: GameDataSheetProps) {
  const {
    open,
    setOpen,
    fieldName,
    setFieldName,
    item,
    setItem,
    onItemChange,
    setOnItemChange,
    showDeleteButton,
    setShowDeleteButton,
  } = useGameDataSheet();
  const [updatedItem, setUpdatedItem] = useState<unknown>(null);
  const [newSyllable, setNewSyllable] = useState<string>("");
  const [newWord, setNewWord] = useState<string>("");

  function handleDelete() {
    if (onItemChange) onItemChange(null);
  }

  function handleSave() {
    let updatedItemCopy = updatedItem;
    if (fieldName === "wordSets" || fieldName === "wordChains") {
      if (newSyllable) {
        const updatedWordItem = updatedItem as WordItem;
        updatedItemCopy = {
          ...(updatedWordItem as WordItem),
          syllables: updatedWordItem.syllables
            ? [...updatedWordItem.syllables, newSyllable]
            : [newSyllable],
        };
        setNewSyllable("");
      }
    } else if (fieldName === "sentences") {
      if (newWord) {
        const updatedSentenceItem = updatedItem as SentenceItem;
        updatedItemCopy = {
          ...updatedSentenceItem,
          words: updatedSentenceItem.words
            ? [...updatedSentenceItem.words, newWord]
            : [newWord],
        };
        setNewWord("");
      }
    }
    if (updatedItem && onItemChange) onItemChange(updatedItemCopy);
  }

  function renderSheetContents(item: unknown) {
    if (updatedItem === null) setUpdatedItem(item);

    switch (fieldName) {
      case "newCode":
      case "cumulativeCode":
        return (
          <CodeSheetContents
            updatedCode={updatedItem as Code}
            setUpdatedCode={setUpdatedItem}
          />
        );

      case "newMorphemes":
      case "cumulativeMorphemes":
        return (
          <MorphemeSheetContents
            updatedMorpheme={updatedItem as Morpheme}
            setUpdatedMorpheme={setUpdatedItem}
          />
        );

      case "wordSets":
      case "wordChains":
        return (
          <WordItemSheetContents
            updatedWordItem={updatedItem as WordItem}
            setUpdatedWordItem={setUpdatedItem}
            newSyllable={newSyllable}
            setNewSyllable={setNewSyllable}
          />
        );

      case "morphemeWordSets":
        return (
          <MorphemeWordSheetContents
            updatedMorphemeWord={updatedItem as MorphemeWord}
            setUpdatedMorphemeWord={setUpdatedItem}
          />
        );

      case "sentences":
        return (
          <SentenceSheetContents
            updatedSentence={updatedItem as SentenceItem}
            setUpdatedSentence={setUpdatedItem}
            newWord={newWord}
            setNewWord={setNewWord}
          />
        );

      case "trickyWords":
        return (
          <TrickyWordSheetContents
            updatedTrickyWord={updatedItem as string}
            setUpdatedTrickyWord={setUpdatedItem}
          />
        );

      case "extra":
        return (
          <ExtraSheetContents
            updatedExtra={updatedItem as string}
            setUpdatedExtra={setUpdatedItem}
          />
        );

      default:
        return undefined;
    }
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          setOpen(false);
          setUpdatedItem(null);
          setItem(null);
          setFieldName(null);
          setOnItemChange(null);
          setShowDeleteButton(false);
        }
      }}
    >
      <div>{children}</div>
      <SheetContent>
        {item || typeof item === "string" ? (
          renderSheetContents(item) || (
            <SheetContentContainer>
              <SheetTitle>Unsupported Field</SheetTitle>
              <SheetDescription>
                The field type {fieldName} isn't supported yet.
              </SheetDescription>
            </SheetContentContainer>
          )
        ) : (
          <SheetContentContainer>
            <SheetTitle>Item not found</SheetTitle>
            <SheetDescription>
              Could not find the item you're looking for.
            </SheetDescription>
          </SheetContentContainer>
        )}

        <SheetFooter className="flex gap-2">
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
          {showDeleteButton && (
            <SheetClose asChild>
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            </SheetClose>
          )}
          <SheetClose asChild>
            <Button onClick={handleSave}>Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
