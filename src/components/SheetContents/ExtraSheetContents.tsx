import { Input } from "../ui/input";
import { SheetDescription, SheetTitle } from "../ui/sheet";
import { SheetContentContainer } from "../StyledComponents";

interface ExtraSheetContentsProps {
  updatedExtra: string | null;
  setUpdatedExtra: (value: string) => void;
}
export default function ExtraSheetContents({
  updatedExtra,
  setUpdatedExtra,
}: ExtraSheetContentsProps) {
  return (
    <>
      <SheetTitle>Extra</SheetTitle>
      <SheetDescription>Edit extra level details.</SheetDescription>
      <SheetContentContainer>
        <Input
          className="mt-4 mb-4"
          value={updatedExtra || ""}
          onChange={(e) => setUpdatedExtra(e.target.value)}
        />
      </SheetContentContainer>
    </>
  );
}
