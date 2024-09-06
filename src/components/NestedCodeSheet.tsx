import { Code } from "@/model";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "./ui/sheet";
import CodeSheetContents from "./SheetContents/CodeSheetContents";
import { useState } from "react";
import { Button } from "./ui/button";

interface NestedCodeSheetProps {
  code: Code;
  onSave: (code: Code) => void;
  children?: React.ReactNode;
}
export default function NestedCodeSheet({
  code,
  onSave,
  children,
}: NestedCodeSheetProps) {
  const [updatedCode, setUpdatedCode] = useState<Code>(code);

  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>

      <SheetContent>
        <CodeSheetContents
          updatedCode={updatedCode}
          setUpdatedCode={setUpdatedCode}
        />

        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
          <SheetClose asChild>
            <Button onClick={() => onSave(updatedCode)}>Save Changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
