import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { allPhonemes } from "@/lib/constants";
import { X } from "lucide-react";

interface PhonemeSelectorProps {
  phoneme: string;
  onPhonemeChange: (phoneme: string | null) => void;
  hideDelete?: boolean;
}
export default function PhonemeSelector({
  phoneme,
  onPhonemeChange,
  hideDelete = false,
}: PhonemeSelectorProps) {
  return (
    <div className="mt-2 flex items-center gap-4">
      <Select value={phoneme} onValueChange={onPhonemeChange}>
        <SelectTrigger>
          <SelectValue placeholder="Add a phoneme" />
        </SelectTrigger>
        <SelectContent>
          {allPhonemes.map((p) => (
            <SelectItem key={p} value={p}>
              {p}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {!hideDelete ? (
        <X
          size={16}
          className="cursor-pointer"
          onClick={() => onPhonemeChange(null)}
        />
      ) : (
        <div className="w-4" />
      )}
    </div>
  );
}
