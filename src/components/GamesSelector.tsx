import { games } from "@/model";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { getPrettyGameName } from "@/utils";
import styled from "styled-components";

interface GamesSelectorProps {
  value: string[];
  onChange: (games: string[]) => void;
}
export default function GamesSelector({ value, onChange }: GamesSelectorProps) {
  return (
    <GamesSelectorContainer>
      {games.map((game) => (
        <GameSelector key={game}>
          <Checkbox
            id={game}
            checked={value.includes(game)}
            onCheckedChange={(checked) => {
              if (checked) {
                onChange([...value, game]);
              } else {
                onChange(value.filter((g) => g !== game));
              }
            }}
          />
          <Label htmlFor={game}>{getPrettyGameName(game)}</Label>
        </GameSelector>
      ))}
    </GamesSelectorContainer>
  );
}

const GamesSelectorContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  padding: 1rem;
  border: 1px solid hsl(var(--border));
  border-radius: 0.5rem;
`;

const GameSelector = styled.div`
  display: flex;
  gap: 0.5rem;
`;
