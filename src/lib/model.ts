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
  extra: string[];

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

export interface Code {
  spelling: string;
  phoneme: string[] | string;
}

export interface Morpheme {
  morpheme: string;
  type: "base" | "prefix" | "suffix" | "connector";
  affixId?: number;
  baseId?: number;
  pronunciation?: string;
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
