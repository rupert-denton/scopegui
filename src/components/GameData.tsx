import styled from "styled-components";
import {
  ScopeAndSequenceLevel,
  Code,
  Morpheme,
  WordItem,
  MorphemeWord,
  SentenceItem,
  gameDataFields,
} from "../model.ts";
import GameDataItem from "./GameDataItem.tsx";
import GameDataSheet from "./GameDataSheet.tsx";

interface GameDataProps {
  levelId: number;
  fieldName: (typeof gameDataFields)[number];
  value: ScopeAndSequenceLevel;
}
export default function GameData({ levelId, fieldName, value }: GameDataProps) {
  const renderField = () => {
    // Handle based on the field type
    if (!value || !Array.isArray(value)) {
      return <p>No data available</p>;
    }

    switch (fieldName) {
      case "newCode":
      case "cumulativeCode":
        return renderCodeList(value as Code[]);

      case "newMorphemes":
      case "cumulativeMorphemes":
        return renderMorphemeList(value as Morpheme[]);

      case "wordSets":
      case "wordChains":
        return renderWordItemList(value as WordItem[]);

      case "morphemeWordSets":
        return renderMorphemeWordList(value as MorphemeWord[]);

      case "sentences":
        return renderSentenceList(value as SentenceItem[]);

      case "trickyWords":
        return renderTrickyWords(value as string[]);

      default:
        return <p>Unsupported field</p>;
    }
  };

  const renderCodeList = (codes: Code[]) =>
    codes.map((code, index) => (
      <GameDataSheet
        key={index}
        levelId={levelId}
        fieldName={fieldName}
        item={code}
        index={index}
      >
        <GameDataItem value={code.spelling} />
      </GameDataSheet>
    ));

  const renderMorphemeList = (morphemes: Morpheme[]) =>
    morphemes.map((morpheme, index) => (
      <GameDataSheet
        key={index}
        levelId={levelId}
        fieldName={fieldName}
        item={morpheme}
        index={index}
      >
        <GameDataItem value={morpheme.morpheme} />
      </GameDataSheet>
    ));

  const renderWordItemList = (words: WordItem[]) =>
    words.map((wordItem, index) => (
      <GameDataSheet
        key={index}
        levelId={levelId}
        fieldName={fieldName}
        item={wordItem}
        index={index}
      >
        <GameDataItem value={wordItem.word} />
      </GameDataSheet>
    ));

  const renderMorphemeWordList = (morphemeWords: MorphemeWord[]) =>
    morphemeWords.map((mw, index) => (
      <GameDataSheet
        key={index}
        levelId={levelId}
        fieldName={fieldName}
        item={mw}
        index={index}
      >
        <GameDataItem value={mw.word} />
      </GameDataSheet>
    ));

  const renderSentenceList = (sentences: SentenceItem[]) =>
    sentences.map((sentenceItem, index) => (
      <GameDataSheet
        key={index}
        levelId={levelId}
        fieldName={fieldName}
        item={sentenceItem}
        index={index}
      >
        <GameDataItem value={sentenceItem.sentence} />
      </GameDataSheet>
    ));

  const renderTrickyWords = (words: string[]) =>
    words.map((word, index) => (
      <GameDataSheet
        key={index}
        levelId={levelId}
        fieldName={fieldName}
        item={word}
        index={index}
      >
        <GameDataItem value={word} />
      </GameDataSheet>
    ));

  return <GameDataContainer>{renderField()}</GameDataContainer>;
}

const GameDataContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.1rem;
`;
