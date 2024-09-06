import styled from "styled-components";
import {
  ScopeAndSequenceLevel,
  Code,
  Morpheme,
  WordItem,
  MorphemeWord,
  SentenceItem,
} from "../model.ts";
import GameDataItem from "./GameDataItem.tsx";
import GameDataSheet from "./GameDataSheet.tsx";

interface GameDataProps {
  fieldName: keyof ScopeAndSequenceLevel;
  levelData: ScopeAndSequenceLevel;
  updateLevel: (updatedLevel: ScopeAndSequenceLevel) => void;
}
export default function GameData({
  fieldName,
  levelData,
  updateLevel,
}: GameDataProps) {
  const renderField = () => {
    if (!levelData[fieldName] || !Array.isArray(levelData[fieldName])) {
      return <p>No data available</p>;
    }

    switch (fieldName) {
      case "newCode":
      case "cumulativeCode":
        return renderCodeList(levelData[fieldName] as Code[]);

      case "newMorphemes":
      case "cumulativeMorphemes":
        return renderMorphemeList(levelData[fieldName] as Morpheme[]);

      case "wordSets":
      case "wordChains":
        return renderWordItemList(levelData[fieldName] as WordItem[]);

      case "morphemeWordSets":
        return renderMorphemeWordList(levelData[fieldName] as MorphemeWord[]);

      case "sentences":
        return renderSentenceList(levelData[fieldName] as SentenceItem[]);

      case "trickyWords":
        return renderTrickyWords(levelData[fieldName] as string[]);

      default:
        return <p>Unsupported field</p>;
    }
  };

  const renderCodeList = (codes: Code[]) =>
    codes.map((code, index) => (
      <GameDataSheet
        key={index}
        fieldName={fieldName}
        item={code}
        index={index}
        levelData={levelData}
        updateLevel={updateLevel}
      >
        <GameDataItem value={code.spelling} />
      </GameDataSheet>
    ));

  const renderMorphemeList = (morphemes: Morpheme[]) =>
    morphemes.map((morpheme, index) => (
      <GameDataSheet
        key={index}
        fieldName={fieldName}
        item={morpheme}
        index={index}
        levelData={levelData}
        updateLevel={updateLevel}
      >
        <GameDataItem value={morpheme.morpheme} />
      </GameDataSheet>
    ));

  const renderWordItemList = (words: WordItem[]) =>
    words.map((wordItem, index) => (
      <GameDataSheet
        key={index}
        fieldName={fieldName}
        item={wordItem}
        index={index}
        levelData={levelData}
        updateLevel={updateLevel}
      >
        <GameDataItem value={wordItem.word} />
      </GameDataSheet>
    ));

  const renderMorphemeWordList = (morphemeWords: MorphemeWord[]) =>
    morphemeWords.map((mw, index) => (
      <GameDataSheet
        key={index}
        fieldName={fieldName}
        item={mw}
        index={index}
        levelData={levelData}
        updateLevel={updateLevel}
      >
        <GameDataItem value={mw.word} />
      </GameDataSheet>
    ));

  const renderSentenceList = (sentences: SentenceItem[]) =>
    sentences.map((sentenceItem, index) => (
      <GameDataSheet
        key={index}
        fieldName={fieldName}
        item={sentenceItem}
        index={index}
        levelData={levelData}
        updateLevel={updateLevel}
      >
        <GameDataItem value={sentenceItem.sentence} />
      </GameDataSheet>
    ));

  const renderTrickyWords = (words: string[]) =>
    words.map((word, index) => (
      <GameDataSheet
        key={index}
        fieldName={fieldName}
        item={word}
        index={index}
        levelData={levelData}
        updateLevel={updateLevel}
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
