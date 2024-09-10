import { createContext, useState } from "react";

interface GameDataSheetContextType {
  open: boolean;
  setOpen: (open: boolean) => void;

  level: number | null;
  setLevel: (level: number | null) => void;

  fieldName: string | null;
  setFieldName: (fieldName: string | null) => void;

  item: unknown;
  setItem: (item: unknown) => void;

  onItemChange: ((newItem: unknown) => void) | null;
  setOnItemChange: (
    newOnItemChange: ((newItem: unknown) => void) | null
  ) => void;

  showDeleteButton: boolean;
  setShowDeleteButton: (showDeleteButton: boolean) => void;
}

export const GameDataSheetContext =
  createContext<GameDataSheetContextType | null>(null);

interface GameDataSheetProviderProps {
  children: React.ReactNode;
}
export function GameDataSheetProvider({
  children,
}: GameDataSheetProviderProps) {
  const [open, setOpen] = useState(false);
  const [level, setLevel] = useState<number | null>(null);
  const [fieldName, setFieldName] = useState<string | null>(null);
  const [item, setItem] = useState<unknown>(null);
  const [onItemChange, setOnItemChange] = useState<
    ((newItem: unknown) => void) | null
  >(null);
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  return (
    <GameDataSheetContext.Provider
      value={{
        open,
        setOpen,
        level,
        setLevel,
        fieldName,
        setFieldName,
        item,
        setItem,
        onItemChange,
        setOnItemChange,
        showDeleteButton,
        setShowDeleteButton,
      }}
    >
      {children}
    </GameDataSheetContext.Provider>
  );
}
