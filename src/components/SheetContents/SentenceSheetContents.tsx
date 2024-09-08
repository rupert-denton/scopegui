import { SentenceItem } from "@/lib/model";
import { SheetDescription, SheetTitle } from "../ui/sheet";
import { SheetContentContainer } from "../StyledComponents";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { X } from "lucide-react";

interface SentenceSheetContentsProps {
  updatedSentence: SentenceItem | null;
  setUpdatedSentence: (sentence: SentenceItem | null) => void;
  newWord: string;
  setNewWord: (word: string) => void;
}
export default function SentenceSheetContents({
  updatedSentence,
  setUpdatedSentence,
  newWord,
  setNewWord,
}: SentenceSheetContentsProps) {
  return (
    <>
      <SheetTitle>Sentence Item</SheetTitle>
      <SheetDescription>Edit a sentence item.</SheetDescription>
      {updatedSentence && (
        <SheetContentContainer>
          <Label htmlFor="sentence" className="mt-4">
            Sentence
          </Label>
          <Input
            id="sentence"
            className="mt-2"
            value={updatedSentence.sentence}
            onChange={(e) =>
              setUpdatedSentence({
                ...updatedSentence,
                sentence: e.target.value,
              })
            }
          />

          <Label htmlFor="words" className="mt-4">
            Words
          </Label>
          {updatedSentence.words?.map((word, index) => (
            <div key={index} className="relative">
              <Input
                className="mt-2"
                value={word}
                onChange={(e) =>
                  setUpdatedSentence({
                    ...updatedSentence,
                    words: updatedSentence.words?.map((w, i) =>
                      i === index ? e.target.value : w
                    ),
                  })
                }
              />
              <X
                size={16}
                className="absolute right-2 top-5 cursor-pointer"
                onClick={() => {
                  setUpdatedSentence({
                    ...updatedSentence,
                    words: updatedSentence.words?.filter((_, i) => {
                      return i !== index;
                    }),
                  });
                }}
              />
            </div>
          ))}
          <Input
            className="mt-2"
            value={newWord}
            placeholder="Add a word"
            onChange={(e) => setNewWord(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                setUpdatedSentence({
                  ...updatedSentence,
                  words: updatedSentence.words
                    ? [...updatedSentence.words, newWord]
                    : [newWord],
                });
                setNewWord("");
              }
            }}
          />
        </SheetContentContainer>
      )}
    </>
  );
}
