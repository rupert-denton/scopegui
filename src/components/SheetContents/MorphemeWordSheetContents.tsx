import { Morpheme, MorphemeWord } from "@/lib/model";
import { SheetTitle, SheetDescription } from "../ui/sheet";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import GameDataItem from "../GameDataItem";
import NestedMorphemeSheet from "../NestedMorphemeSheet";
import {
  ContentWrapper,
  GameItemsContainer,
  SheetContentContainer,
} from "../StyledComponents";
import MorphemeSelector from "../MorphemeSelector";

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
      <SheetTitle>Morpheme Word</SheetTitle>
      <SheetDescription>Edit a morpheme word.</SheetDescription>
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
          <p className="text-xs text-zinc-600">
            (* means alternate pronunciation is set)
          </p>
          <ContentWrapper className="mt-2">
            <GameItemsContainer>
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
                  <GameDataItem
                    value={morpheme.morpheme}
                    alternatePronunciation={!!morpheme.pronunciation}
                  />
                </NestedMorphemeSheet>
              ))}
              <MorphemeSelector
                onMorphemeSelected={(morpheme) =>
                  setUpdatedMorphemeWord({
                    ...updatedMorphemeWord,
                    morphemes: [...updatedMorphemeWord.morphemes, morpheme],
                  })
                }
              >
                <GameDataItem value="+" />
              </MorphemeSelector>
            </GameItemsContainer>
          </ContentWrapper>

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
