import useGameDataSheet from "@/hooks/useGameDataSheet";
import styled from "styled-components";

interface GameDataItemProps {
  value: string;
  fieldName?: string;
  item?: unknown;
  onItemChange?: (newItem: unknown) => void;
  showDeleteButton?: boolean;
}
export default function GameDataItem({
  value,
  fieldName,
  item,
  onItemChange,
  showDeleteButton = false,
}: GameDataItemProps) {
  const {
    setOpen,
    setFieldName,
    setItem,
    setOnItemChange,
    setShowDeleteButton,
  } = useGameDataSheet();

  function handleClick() {
    if (item === undefined || !fieldName || !onItemChange) return;
    setFieldName(fieldName);
    setItem(item);
    setOnItemChange(() => onItemChange);
    setShowDeleteButton(showDeleteButton);
    setOpen(true);
  }

  return (
    <GameDataItemContainer onClick={handleClick}>
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
