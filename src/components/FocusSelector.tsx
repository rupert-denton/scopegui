import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface FocusSelectorProps {
  value: string;
  onChange: (newValue: string) => void;
}
export default function FocusSelector({ value, onChange }: FocusSelectorProps) {
  return (
    <Select
      value={value as string}
      onValueChange={(newValue) => onChange(newValue)}
    >
      <SelectTrigger>
        <SelectValue placeholder={value as string} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="phonics">phonics</SelectItem>
        <SelectItem value="morphology">morphology</SelectItem>
      </SelectContent>
    </Select>
  );
}
