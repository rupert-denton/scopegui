import { Morpheme } from "@/lib/model";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "./ui/sheet";
import MorphemeSheetContents from "./SheetContents/MorphemeSheetContents";
import { useState } from "react";
import { Button } from "./ui/button";

interface NestedMorphemeSheetProps {
  morpheme: Morpheme;
  onSave: (morpheme: Morpheme | null) => void;
  showDeleteButton?: boolean;
  children?: React.ReactNode;
}
export default function NestedMorphemeSheet({
  morpheme,
  onSave,
  showDeleteButton = false,
  children,
}: NestedMorphemeSheetProps) {
  const [updatedMorpheme, setUpdatedMorpheme] = useState<Morpheme>(morpheme);

  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>

      <SheetContent>
        <MorphemeSheetContents
          updatedMorpheme={updatedMorpheme}
          setUpdatedMorpheme={setUpdatedMorpheme}
        />

        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
          {showDeleteButton && (
            <SheetClose asChild>
              <Button variant="destructive" onClick={() => onSave(null)}>
                Delete
              </Button>
            </SheetClose>
          )}
          <SheetClose asChild>
            <Button onClick={() => onSave(updatedMorpheme)}>
              Save Changes
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
