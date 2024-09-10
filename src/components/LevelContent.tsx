import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScopeAndSequenceLevel } from "../lib/model";
import { gameDataFields } from "@/lib/constants";
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
            <TableCell className="w-[70%]">
              {gameDataFields.includes(key) ? (
                <div className="min-h-12">
                  <GameData
                    level={levelData.level}
                    fieldName={key as keyof ScopeAndSequenceLevel}
                    items={value}
                    onItemsChange={(newValue) =>
                      newValue && updateLevel(levelData.id, { [key]: newValue })
                    }
                    showAddButton={
                      showAddForRow === key &&
                      key !== "cumulativeCode" &&
                      key !== "cumulativeMorphemes"
                    }
                  />
                </div>
              ) : (
                <LevelInfo
                  level={levelData.level}
                  levelId={levelData.id}
                  fieldName={key}
                  value={value}
                  showAddButton={showAddForRow === key}
                />
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
