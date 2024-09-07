import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { SheetTitle, SheetDescription } from "../ui/sheet";
import { SheetContentContainer } from "../StyledComponents";
import { Code } from "@/lib/model";
import PhonemeSelector from "../PhonemeSelector";

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
          {(Array.isArray(updatedCode.phoneme)
            ? updatedCode.phoneme
            : [updatedCode.phoneme]
          ).map((phoneme, index) => (
            <PhonemeSelector
              key={index}
              phoneme={phoneme}
              onPhonemeChange={(newValue) =>
                setUpdatedCode({
                  ...updatedCode,
                  phoneme: newValue
                    ? (updatedCode.phoneme as string[]).map((v, i) =>
                        i === index ? newValue : v
                      )
                    : (updatedCode.phoneme as string[]).filter(
                        (_, i) => i !== index
                      ),
                })
              }
            />
          ))}
          <PhonemeSelector
            phoneme=""
            onPhonemeChange={(newValue) =>
              newValue &&
              setUpdatedCode({
                ...updatedCode,
                phoneme: [...updatedCode.phoneme, newValue],
              })
            }
            hideDelete
          />
        </SheetContentContainer>
      )}
    </>
  );
}
