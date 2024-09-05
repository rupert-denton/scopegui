import { ScopeAndSequenceLevel } from "../model";

interface LevelProps {
  levelData: ScopeAndSequenceLevel;
}
export default function Level({ levelData }: LevelProps) {
  return (
    <div>
      <p>
        {levelData.level} - {levelData.levelInfo}
      </p>
    </div>
  );
}
