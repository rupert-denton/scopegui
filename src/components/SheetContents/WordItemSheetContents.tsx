import { WordItem } from "@/model";
import { SheetTitle, SheetDescription } from "../ui/sheet";
import SheetContentContainer from "./SheetContentContainer";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import GameDataItem from "../GameDataItem";
import { Checkbox } from "../ui/checkbox";
import { X } from "lucide-react";

interface WordItemSheetContentsProps {
  updatedWordItem: WordItem | null;
  setUpdatedWordItem: (wordItem: WordItem | null) => void;
}
export default function WordItemSheetContents({
  updatedWordItem,
  setUpdatedWordItem,
}: WordItemSheetContentsProps) {
  return (
    <>
      <SheetTitle>Word Item</SheetTitle>
      <SheetDescription>Edit a word item.</SheetDescription>
      {updatedWordItem && (
        <SheetContentContainer>
          <Label htmlFor="word" className="mt-4">
            Word
          </Label>
          <Input
            id="word"
            className="mt-2"
            value={updatedWordItem.word}
            onChange={(e) =>
              setUpdatedWordItem({ ...updatedWordItem, word: e.target.value })
            }
          />

          <Label htmlFor="code" className="mt-4">
            Code
          </Label>
          {updatedWordItem.phonemes.map((code, index) => (
            <GameDataItem key={index} value={code.spelling} />
          ))}

          <Label htmlFor="example" className="mt-4">
            Example
          </Label>
          <Input
            id="example"
            className="mt-2"
            value={updatedWordItem.example}
            onChange={(e) =>
              setUpdatedWordItem({
                ...updatedWordItem,
                example: e.target.value ?? undefined,
              })
            }
          />

          <Label htmlFor="syllables" className="mt-4">
            Syllables
          </Label>
          {updatedWordItem.syllables?.map((syllable, index) => (
            <div key={index} className="relative">
              <Input
                className="mt-2"
                value={syllable}
                onChange={(e) =>
                  setUpdatedWordItem({
                    ...updatedWordItem,
                    syllables: updatedWordItem.syllables?.map((s, i) =>
                      i === index ? e.target.value : s
                    ),
                  })
                }
              />
              <X
                size={16}
                className="absolute right-2 top-5 cursor-pointer"
                onClick={() => {
                  setUpdatedWordItem({
                    ...updatedWordItem,
                    syllables: updatedWordItem.syllables?.filter((_, i) => {
                      return i !== index;
                    }),
                  });
                }}
              />
            </div>
          ))}
          <Input
            className="mt-2"
            value=""
            placeholder="Add a syllable"
            onChange={(e) =>
              setUpdatedWordItem({
                ...updatedWordItem,
                syllables: updatedWordItem.syllables
                  ? [...updatedWordItem.syllables, e.target.value]
                  : [e.target.value],
              })
            }
          />

          <div className="flex items-center gap-2 mt-4 mb-2">
            <Checkbox
              id="available"
              checked={updatedWordItem.available}
              onCheckedChange={(checked) =>
                setUpdatedWordItem({
                  ...updatedWordItem,
                  available: checked === true ? true : false, // wtf is this shadcn
                })
              }
            />
            <Label htmlFor="available">Available</Label>
          </div>
        </SheetContentContainer>
      )}
    </>
  );
}
