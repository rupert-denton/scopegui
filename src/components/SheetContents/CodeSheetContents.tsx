import { Label } from "../ui/label";
import { X } from "lucide-react";
import { Input } from "../ui/input";
import { SheetTitle, SheetDescription } from "../ui/sheet";
import SheetContentContainer from "./SheetContentContainer";
import { Code } from "@/lib/model";

interface CodeSheetContentsProps {
  updatedCode: Code | null;
  setUpdatedCode: (value: Code) => void;
}
export default function CodeSheetContents({
  updatedCode,
  setUpdatedCode,
}: CodeSheetContentsProps) {
  return (
    <>
      <SheetTitle>Code</SheetTitle>
      <SheetDescription>Edit a code item.</SheetDescription>
      {updatedCode && (
        <SheetContentContainer>
          <Label htmlFor="spelling" className="mt-2">
            Spelling
          </Label>
          <Input
            id="spelling"
            className="mt-2 mb-2"
            value={updatedCode?.spelling || ""}
            onChange={(e) =>
              setUpdatedCode({ ...updatedCode, spelling: e.target.value })
            }
          />
          <Label htmlFor="phoneme" className="mt-2">
            Phoneme(s)
          </Label>
          {Array.isArray(updatedCode.phoneme) ? (
            <>
              {updatedCode.phoneme.map((phoneme, index) => (
                <div key={index} className="relative">
                  <Input
                    className="mt-2"
                    value={phoneme}
                    onChange={(e) =>
                      setUpdatedCode({
                        ...updatedCode,
                        phoneme: (updatedCode.phoneme as string[]).map((p, i) =>
                          i === index ? e.target.value : p
                        ),
                      })
                    }
                  />
                  <X
                    size={16}
                    className="absolute right-2 top-5 cursor-pointer"
                    onClick={() => {
                      setUpdatedCode({
                        ...updatedCode,
                        phoneme: (updatedCode.phoneme as string[]).filter(
                          (_, i) => i !== index
                        ),
                      });
                    }}
                  />
                </div>
              ))}
              <Input
                id="phoneme"
                className="mt-2 mb-2"
                value={""}
                placeholder="Add phoneme"
                onChange={(e) =>
                  setUpdatedCode({
                    ...updatedCode,
                    phoneme: [...updatedCode.phoneme, e.target.value],
                  })
                }
              />
            </>
          ) : (
            <Input
              id="phoneme"
              className="mt-4 mb-4"
              value={updatedCode?.phoneme || ""}
              onChange={(e) =>
                setUpdatedCode({ ...updatedCode, phoneme: e.target.value })
              }
            />
          )}
        </SheetContentContainer>
      )}
    </>
  );
}
