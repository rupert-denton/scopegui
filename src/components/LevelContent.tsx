import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { gameDataFields, ScopeAndSequenceLevel } from "../model";
import GameData from "./GameData";

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
            <TableCell>
              {gameDataFields.includes(key) ? (
                <GameData value={value} />
              ) : (
                value
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
