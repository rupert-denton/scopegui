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
import useScopeAndSequence from "@/hooks/useScopeAndSequence";

interface LevelContentProps {
  levelData: ScopeAndSequenceLevel;
}
export default function LevelContent({ levelData }: LevelContentProps) {
  const { updateLevel } = useScopeAndSequence();
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
                  fieldName={key as keyof ScopeAndSequenceLevel}
                  levelData={levelData}
                  updateLevel={(updated) => updateLevel(value.id, updated)}
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
