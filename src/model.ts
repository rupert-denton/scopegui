export interface ScopeAndSequence {
  version: string;
  data: ScopeAndSequenceLevel[];
}

export interface ScopeAndSequenceLevel {
  // level info
  id: number;
  level: number;
  tier: number;
  levelInfo: string;
  games: string[];
  focus: string;
  extra?: string | string[];

  // game data
  newCode: Code[];
  cumulativeCode: Code[];
  newMorphemes: Morpheme[];
  cumulativeMorphemes: Morpheme[];
  wordSets: WordItem[];
  morphemeWordSets: MorphemeWord[];
  wordChains: WordItem[];
  sentences: SentenceItem[];
  trickyWords: string[];
}

export const gameDataFields = [
  "newCode",
  "cumulativeCode",
  "newMorphemes",
  "cumulativeMorphemes",
  "wordSets",
  "morphemeWordSets",
  "wordChains",
  "sentences",
  "trickyWords",
];

export interface Code {
  spelling: string;
  phoneme: string[] | string;
}

export interface Morpheme {
  morpheme: string;
  affixId?: number;
  baseId?: number;
  type: "base" | "prefix" | "suffix" | "connector";
}

export interface WordItem {
  word: string;
  phonemes: Code[];
  example?: string;
  available?: boolean;
  syllables?: string[];
}

export interface MorphemeWord {
  word: string;
  morphemes: Morpheme[];
  example?: string;
}

export interface SentenceItem {
  sentence: string;
  words?: string[];
}
