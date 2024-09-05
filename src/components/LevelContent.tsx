import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScopeAndSequenceLevel } from "../model";

interface LevelContentProps {
  levelData: ScopeAndSequenceLevel;
}
export default function LevelContent({ levelData }: LevelContentProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="font-bold">Key</TableHead>
          <TableHead>Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.entries(levelData).map(([key, value]) => (
          <TableRow key={key}>
            <TableCell>{key}</TableCell>
            <TableCell>{JSON.stringify(value)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
