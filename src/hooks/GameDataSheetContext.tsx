import { createContext, useState } from "react";

interface GameDataSheetContextType {
  open: boolean;
  setOpen: (open: boolean) => void;

  fieldName: string | null;
  setFieldName: (fieldName: string | null) => void;

  item: unknown;
  setItem: (item: unknown) => void;

  onItemChange: ((newItem: unknown) => void) | null;
  setOnItemChange: (
    newOnItemChange: ((newItem: unknown) => void) | null
  ) => void;
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
  const [fieldName, setFieldName] = useState<string | null>(null);
  const [item, setItem] = useState<unknown>(null);
  const [onItemChange, setOnItemChange] = useState<
    ((newItem: unknown) => void) | null
  >(null);

  return (
    <GameDataSheetContext.Provider
      value={{
        open,
        setOpen,
        fieldName,
        setFieldName,
        item,
        setItem,
        onItemChange,
        setOnItemChange,
      }}
    >
      {children}
    </GameDataSheetContext.Provider>
  );
}
