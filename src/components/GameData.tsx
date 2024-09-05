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

interface GameDataProps {
  fieldName: (typeof gameDataFields)[number];
  value: ScopeAndSequenceLevel;
}
export default function GameData({ fieldName, value }: GameDataProps) {
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
      <GameDataItem key={index} value={code.spelling} />
    ));

  const renderMorphemeList = (morphemes: Morpheme[]) =>
    morphemes.map((morpheme, index) => (
      <GameDataItem key={index} value={morpheme.morpheme} />
    ));

  const renderWordItemList = (words: WordItem[]) =>
    words.map((wordItem, index) => (
      <GameDataItem key={index} value={wordItem.word} />
    ));

  const renderMorphemeWordList = (morphemeWords: MorphemeWord[]) =>
    morphemeWords.map((mw, index) => (
      <GameDataItem key={index} value={mw.word} />
    ));

  const renderSentenceList = (sentences: SentenceItem[]) =>
    sentences.map((sentenceItem, index) => (
      <GameDataItem key={index} value={sentenceItem.sentence} />
    ));

  const renderTrickyWords = (words: string[]) =>
    words.map((word, index) => <GameDataItem key={index} value={word} />);

  return <GameDataContainer>{renderField()}</GameDataContainer>;
}

const GameDataContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.1rem;
`;
