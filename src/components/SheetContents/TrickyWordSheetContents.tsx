import { Input } from "../ui/input";
import { SheetDescription, SheetTitle } from "../ui/sheet";
import { SheetContentContainer } from "../StyledComponents";

interface TrickyWordSheetContentsProps {
  updatedTrickyWord: string | null;
  setUpdatedTrickyWord: (value: string) => void;
}
export default function TrickyWordSheetContents({
  updatedTrickyWord,
  setUpdatedTrickyWord,
}: TrickyWordSheetContentsProps) {
  return (
    <>
      <SheetTitle>Tricky Word</SheetTitle>
      <SheetDescription>Edit a tricky word.</SheetDescription>
      <SheetContentContainer>
        <Input
          className="mt-4 mb-4"
          value={updatedTrickyWord || ""}
          onChange={(e) => setUpdatedTrickyWord(e.target.value)}
        />
      </SheetContentContainer>
    </>
  );
}
