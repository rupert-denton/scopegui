import styled from "styled-components";

interface GameDataItemProps {
  value: string;
}
export default function GameDataItem({ value }: GameDataItemProps) {
  return (
    <GameDataItemContainer>
      <GameDataItemValue>{value}</GameDataItemValue>
    </GameDataItemContainer>
  );
}

const GameDataItemContainer = styled.div`
  border: 1px solid #000;
  border-radius: 3px;
  padding: 8px;
  margin: 5px;
  text-align: center;
  min-width: 30px;
  min-height: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
    transition: background-color 0.2s ease;
  }
`;

const GameDataItemValue = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
