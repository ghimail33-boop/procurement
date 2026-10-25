import rawPrecedents from './legalPrecedentsData.json';

export interface PrecedentOpinion {
  id: string;
  category: string;
  categoryKey: 'construction' | 'goods' | 'services' | 'misc';
  categoryColor: 'amber' | 'blue' | 'purple' | 'emerald';
  no: number;
  date: string;
  requestingEntity: string;
  subject: string;
  opinion: string;
  act: string;
  rule: string;
  actNumbers: string[];
  ruleNumbers: string[];
}

export interface PrecedentDecision {
  id: string;
  no: string;
  applicant: string;
  respondent: string;
  subject: string;
  type: string;
  act: string;
  rule: string;
  use: string;
  decision: string;
  actNumbers: string[];
  ruleNumbers: string[];
}

interface RawPrecedentsPayload {
  opinions: PrecedentOpinion[];
  decisions: PrecedentDecision[];
  opsByAct: Record<string, string[]>;
  opsByRule: Record<string, string[]>;
  decByAct: Record<string, string[]>;
  decByRule: Record<string, string[]>;
}

const payload = rawPrecedents as unknown as RawPrecedentsPayload;

export const ALL_PPMO_OPINIONS: PrecedentOpinion[] = payload.opinions;
export const ALL_PPRC_DECISIONS: PrecedentDecision[] = payload.decisions;
export const OPINIONS_BY_ACT: Record<string, string[]> = payload.opsByAct;
export const OPINIONS_BY_RULE: Record<string, string[]> = payload.opsByRule;
export const DECISIONS_BY_ACT: Record<string, string[]> = payload.decByAct;
export const DECISIONS_BY_RULE: Record<string, string[]> = payload.decByRule;

// Fast lookup maps
const OPINIONS_MAP = new Map<string, PrecedentOpinion>(ALL_PPMO_OPINIONS.map((op) => [op.id, op]));
const DECISIONS_MAP = new Map<string, PrecedentDecision>(ALL_PPRC_DECISIONS.map((dec) => [dec.id, dec]));

const normalizeNum = (num: string): string =>
  num.replace(/[०-९]/g, (digit) => String('०१२३४५६७८९'.indexOf(digit)));

const lookupMap = <T>(
  indexMap: Record<string, string[]>,
  entityMap: Map<string, T>,
  targetNumber: string
): T[] => {
  const normalized = normalizeNum(targetNumber).trim();
  const baseNum = normalized.replace(/[^0-9]/g, '');
  const idSet = new Set<string>();

  // 1. Direct match
  (indexMap[normalized] ?? []).forEach((id) => idSet.add(id));

  // 2. If looking up base number (e.g. "31"), also include direct letter variants (e.g. "31क")
  if (normalized === baseNum && baseNum) {
    for (const key of Object.keys(indexMap)) {
      if (key !== baseNum && key.startsWith(baseNum) && !/^[0-9]/.test(key.slice(baseNum.length))) {
        (indexMap[key] ?? []).forEach((id) => idSet.add(id));
      }
    }
  }

  // 3. If looking up letter variant (e.g. "31क"), also include base number (e.g. "31")
  if (normalized !== baseNum && baseNum && indexMap[baseNum]) {
    indexMap[baseNum].forEach((id) => idSet.add(id));
  }

  return Array.from(idSet).map((id) => entityMap.get(id)!).filter(Boolean);
};

export const getOpinionsForAct = (actNumber: string): PrecedentOpinion[] => {
  return lookupMap(OPINIONS_BY_ACT, OPINIONS_MAP, actNumber);
};

export const getOpinionsForRule = (ruleNumber: string): PrecedentOpinion[] => {
  return lookupMap(OPINIONS_BY_RULE, OPINIONS_MAP, ruleNumber);
};

export const getDecisionsForAct = (actNumber: string): PrecedentDecision[] => {
  return lookupMap(DECISIONS_BY_ACT, DECISIONS_MAP, actNumber);
};

export const getDecisionsForRule = (ruleNumber: string): PrecedentDecision[] => {
  return lookupMap(DECISIONS_BY_RULE, DECISIONS_MAP, ruleNumber);
};
