import useGameDataSheet from "@/hooks/useGameDataSheet";
import { Asterisk } from "lucide-react";
import { forwardRef } from "react";
import styled from "styled-components";

interface GameDataItemProps {
  value: string;
  level?: number;
  fieldName?: string;
  item?: unknown;
  onItemChange?: (newItem: unknown) => void;
  showDeleteButton?: boolean;
  alternatePronunciation?: boolean;
}
const GameDataItem = forwardRef<HTMLDivElement, GameDataItemProps>(
  (
    {
      value,
      level,
      fieldName,
      item,
      onItemChange,
      showDeleteButton = false,
      alternatePronunciation = false,
    },
    ref
  ) => {
    const {
      setOpen,
      setLevel,
      setFieldName,
      setItem,
      setOnItemChange,
      setShowDeleteButton,
    } = useGameDataSheet();

    function handleClick() {
      if (item === undefined || !level || !fieldName || !onItemChange) return;
      setLevel(level);
      setFieldName(fieldName);
      setItem(item);
      setOnItemChange(() => onItemChange);
      setShowDeleteButton(showDeleteButton);
      setOpen(true);
    }

    return (
      <GameDataItemContainer ref={ref} onClick={handleClick}>
        <GameDataItemValue>{value}</GameDataItemValue>
        {alternatePronunciation && (
          <AlternatePronunciationIndicator>
            <Asterisk size={12} />
          </AlternatePronunciationIndicator>
        )}
      </GameDataItemContainer>
    );
  }
);

GameDataItem.displayName = "GameDataItem";

export default GameDataItem;

const GameDataItemContainer = styled.div`
  position: relative;
  border: 1px solid #000;
  border-radius: 3px;
  padding: 8px;
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

const AlternatePronunciationIndicator = styled.div`
  position: absolute;
  top: 0.1rem;
  right: 0.05rem;
`;
