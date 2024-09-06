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
import { useState } from "react";

interface LevelContentProps {
  levelData: ScopeAndSequenceLevel;
}
export default function LevelContent({ levelData }: LevelContentProps) {
  const { updateLevel } = useScopeAndSequence();
  const [showAddForRow, setShowAddForRow] = useState<string | null>(null);

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
          <TableRow
            key={key}
            className="min-h-10"
            onMouseEnter={() => setShowAddForRow(key)}
            onMouseLeave={() => setShowAddForRow(null)}
          >
            <TableCell className="font-medium">{key}</TableCell>
            <TableCell>
              {gameDataFields.includes(key) ? (
                <div className="min-h-12">
                  <GameData
                    fieldName={key as keyof ScopeAndSequenceLevel}
                    levelData={levelData}
                    updateLevel={(updated) => updateLevel(value.id, updated)}
                    showAddButton={showAddForRow === key}
                  />
                </div>
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
