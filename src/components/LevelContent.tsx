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
import LevelInfo from "./LevelInfo";

interface LevelContentProps {
  levelData: ScopeAndSequenceLevel;
}
export default function LevelContent({ levelData }: LevelContentProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Key</TableHead>
          <TableHead>Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.entries(levelData).map(([key, value]) => (
          <TableRow key={key}>
            <TableCell className="font-medium">{key}</TableCell>
            <TableCell>
              {gameDataFields.includes(key) ? (
                <GameData
                  levelId={levelData.id}
                  fieldName={key}
                  value={value}
                />
              ) : (
                <LevelInfo
                  levelId={levelData.id}
                  fieldName={key}
                  value={value}
                />
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
