import { Morpheme } from "@/lib/model";
import { SheetContentContainer } from "../StyledComponents";
import { SheetTitle, SheetDescription } from "../ui/sheet";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { SelectValue } from "@radix-ui/react-select";

interface MorphemeSheetContentsProps {
  updatedMorpheme: Morpheme | null;
  setUpdatedMorpheme: (morpheme: Morpheme) => void;
}
export default function MorphemeSheetContents({
  updatedMorpheme,
  setUpdatedMorpheme,
}: MorphemeSheetContentsProps) {
  return (
    <>
      <SheetTitle>Morpheme</SheetTitle>
      <SheetDescription>Edit a morpheme.</SheetDescription>
      {updatedMorpheme && (
        <SheetContentContainer>
          <Label htmlFor="morpheme">Morpheme</Label>
          <Input
            id="morpheme"
            className="mt-2"
            value={updatedMorpheme.morpheme}
            onChange={(e) =>
              setUpdatedMorpheme({
                ...updatedMorpheme,
                morpheme: e.target.value,
              })
            }
          />

          <Label htmlFor="type" className="mt-4">
            Type
          </Label>
          <Select
            value={updatedMorpheme.type}
            onValueChange={(value) =>
              setUpdatedMorpheme({
                ...updatedMorpheme,
                type: value as typeof updatedMorpheme.type,
              })
            }
          >
            <SelectTrigger id="type" className="mt-2 w-full">
              <SelectValue placeholder={updatedMorpheme.type} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="base">Base</SelectItem>
              <SelectItem value="prefix">Prefix</SelectItem>
              <SelectItem value="suffix">Suffix</SelectItem>
              <SelectItem value="connector">Connector</SelectItem>
            </SelectContent>
          </Select>

          {["prefix", "suffix"].includes(updatedMorpheme.type) && (
            <>
              <Label htmlFor="affixId" className="mt-4">
                Affix ID
              </Label>
              <Input
                id="affixId"
                className="mt-2"
                value={updatedMorpheme.affixId || ""}
                onChange={(e) =>
                  setUpdatedMorpheme({
                    ...updatedMorpheme,
                    affixId: parseInt(e.target.value),
                  })
                }
              />
            </>
          )}

          {updatedMorpheme.type === "base" && (
            <>
              <Label htmlFor="baseId" className="mt-4">
                Base ID
              </Label>
              <Input
                id="baseId"
                className="mt-2"
                value={updatedMorpheme.baseId || ""}
                onChange={(e) =>
                  setUpdatedMorpheme({
                    ...updatedMorpheme,
                    baseId: parseInt(e.target.value),
                  })
                }
              />
            </>
          )}
        </SheetContentContainer>
      )}
    </>
  );
}
