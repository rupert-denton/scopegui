import { Morpheme, MorphemeWord } from "@/lib/model";
import { SheetTitle, SheetDescription } from "../ui/sheet";
import SheetContentContainer from "./SheetContentContainer";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import GameDataItem from "../GameDataItem";
import NestedMorphemeSheet from "../NestedMorphemeSheet";
import GameItemsContainer from "../GameItemsContainer";

interface MorphemeWordSheetContentsProps {
  updatedMorphemeWord: MorphemeWord | null;
  setUpdatedMorphemeWord: (wordItem: MorphemeWord | null) => void;
}
export default function MorphemeWordSheetContainer({
  updatedMorphemeWord,
  setUpdatedMorphemeWord,
}: MorphemeWordSheetContentsProps) {
  function handleSaveMorpheme(index: number, updatedMorpheme: Morpheme) {
    if (!updatedMorphemeWord) return;
    setUpdatedMorphemeWord({
      ...updatedMorphemeWord,
      morphemes: updatedMorphemeWord.morphemes.map((morpheme, i) =>
        i === index ? updatedMorpheme : morpheme
      ),
    });
  }

  function handleDeleteMorpheme(index: number) {
    if (!updatedMorphemeWord) return;
    setUpdatedMorphemeWord({
      ...updatedMorphemeWord,
      morphemes: updatedMorphemeWord.morphemes.filter((_, i) => i !== index),
    });
  }

  return (
    <>
      <SheetTitle>Word Item</SheetTitle>
      <SheetDescription>Edit a word item.</SheetDescription>
      {updatedMorphemeWord && (
        <SheetContentContainer>
          <Label htmlFor="word" className="mt-4">
            Word
          </Label>
          <Input
            id="word"
            className="mt-2"
            value={updatedMorphemeWord.word}
            onChange={(e) =>
              setUpdatedMorphemeWord({
                ...updatedMorphemeWord,
                word: e.target.value,
              })
            }
          />

          <Label htmlFor="morphemes" className="mt-4">
            Morphemes
          </Label>
          <GameItemsContainer className="mt-2">
            {updatedMorphemeWord.morphemes.map((morpheme, index) => (
              <NestedMorphemeSheet
                key={index}
                morpheme={morpheme}
                onSave={(updatedMorpheme) =>
                  updatedMorpheme
                    ? handleSaveMorpheme(index, updatedMorpheme)
                    : handleDeleteMorpheme(index)
                }
                showDeleteButton
              >
                <GameDataItem value={morpheme.morpheme} />
              </NestedMorphemeSheet>
            ))}
            <NestedMorphemeSheet
              morpheme={{ morpheme: "", type: "base" }}
              onSave={(newMorpheme) =>
                newMorpheme &&
                setUpdatedMorphemeWord({
                  ...updatedMorphemeWord,
                  morphemes: [...updatedMorphemeWord.morphemes, newMorpheme],
                })
              }
            >
              <GameDataItem value="+" />
            </NestedMorphemeSheet>
          </GameItemsContainer>

          <Label htmlFor="example" className="mt-4">
            Example
          </Label>
          <Input
            id="example"
            className="mt-2"
            value={updatedMorphemeWord.example}
            onChange={(e) =>
              setUpdatedMorphemeWord({
                ...updatedMorphemeWord,
                example: e.target.value ?? undefined,
              })
            }
          />
        </SheetContentContainer>
      )}
    </>
  );
}
