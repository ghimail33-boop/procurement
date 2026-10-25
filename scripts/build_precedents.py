import json
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PPMO_DIR = os.path.join(ROOT, "ppmo_pprc")
JSON_OUT = os.path.join(ROOT, "src", "data", "legalPrecedentsData.json")
TS_OUT = os.path.join(ROOT, "src", "data", "legalPrecedents.ts")
OLD_TS = os.path.join(ROOT, "src", "data", "legalPrecedentsData.ts")

if os.path.exists(OLD_TS):
    os.remove(OLD_TS)

def norm_digits(text):
    if not text:
        return ""
    trans = str.maketrans("०१२३४५६७८९", "0123456789")
    return str(text).translate(trans)

def extract_numbers(text, prefix):
    if not text or text.strip() in ["—", "-", "", "none", "null"]:
        return []
    # match patterns like 'दफा ५४', 'दफा ५४(१)', 'दफा ५४(१)(क)', 'दफा ४क', 'नियम ११८', 'नियम ६५च'
    pattern = rf"{prefix}\s*([०-९0-9]+[क-ह]?)"
    matches = re.findall(pattern, text)
    res = set()
    for m in matches:
        res.add(norm_digits(m))
    return sorted(list(res))

def clean_requesting_entity(subject):
    entity = "विभिन्न सार्वजनिक निकाय"
    clean_sub = subject.strip()
    if clean_sub.startswith("माग गर्ने निकाय:"):
        after_prefix = clean_sub.replace("माग गर्ने निकाय:", "", 1).strip()
        parts = re.split(r"\s*—\s*|\s*\|\s*", after_prefix)
        if len(parts) >= 2:
            entity = parts[0].strip()
            clean_sub = " — ".join(parts[1:]).strip()
        else:
            idx = after_prefix.find("।")
            if 0 < idx < 80:
                entity = after_prefix[:idx].strip()
                clean_sub = after_prefix[idx + 1:].strip()
            else:
                entity = after_prefix[:50].strip()
    return entity, clean_sub

def main():
    categories = [
        ("construction", "निर्माण कार्य", "amber"),
        ("goods", "मालसामान आपूर्ति", "blue"),
        ("services", "परामर्श सेवा", "purple"),
        ("misc", "गैर-परामर्श/विविध", "emerald"),
    ]

    all_opinions = []
    ops_by_act = {}
    ops_by_rule = {}

    for cat_key, cat_name, cat_color in categories:
        fpath = os.path.join(PPMO_DIR, f"procurement-{cat_key}.json")
        with open(fpath, "r", encoding="utf-8") as f:
            d = json.load(f)

        for item in d.get("ops", []):
            subject_raw = item.get("subject", "") or ""
            opinion_raw = item.get("opinion", "") or ""
            act_str = item.get("act", "") or ""
            rule_str = item.get("rule", "") or ""

            act_nums = extract_numbers(act_str, "दफा")
            rule_nums = extract_numbers(rule_str, "नियम")

            # fallback to scanning text if empty
            if not act_nums:
                act_nums = extract_numbers(subject_raw + " " + opinion_raw, "दफा")
            if not rule_nums:
                rule_nums = extract_numbers(subject_raw + " " + opinion_raw, "नियम")

            req_entity, clean_sub = clean_requesting_entity(subject_raw)

            op_id = f"op-{cat_key}-{item.get('no', len(all_opinions) + 1)}"
            op_data = {
                "id": op_id,
                "category": cat_name,
                "categoryKey": cat_key,
                "categoryColor": cat_color,
                "no": item.get("no", 0),
                "date": item.get("date", "") or "",
                "requestingEntity": req_entity,
                "subject": clean_sub,
                "opinion": opinion_raw.strip(),
                "act": act_str.strip() if act_str != "—" else "",
                "rule": rule_str.strip() if rule_str != "—" else "",
                "actNumbers": act_nums,
                "ruleNumbers": rule_nums,
            }
            all_opinions.append(op_data)

            for a in act_nums:
                ops_by_act.setdefault(a, []).append(op_id)
            for r in rule_nums:
                ops_by_rule.setdefault(r, []).append(op_id)

    # Read PPRC Decisions
    guide_path = os.path.join(PPMO_DIR, "procurement-guide-data.json")
    with open(guide_path, "r", encoding="utf-8") as f:
        guide = json.load(f)

    all_decisions = []
    dec_by_act = {}
    dec_by_rule = {}

    for item in guide.get("pp", []):
        act_str = item.get("act", "") or ""
        rule_str = item.get("rule", "") or ""
        use_str = item.get("use", "") or ""
        dec_str = item.get("decision", "") or ""
        sub_str = item.get("subject", "") or ""

        act_nums = extract_numbers(act_str, "दफा")
        rule_nums = extract_numbers(rule_str, "नियम")

        if not act_nums:
            act_nums = extract_numbers(use_str + " " + dec_str + " " + sub_str, "दफा")
        if not rule_nums:
            rule_nums = extract_numbers(use_str + " " + dec_str + " " + sub_str, "नियम")

        dec_id = f"pprc-{item.get('no', len(all_decisions) + 1)}"
        dec_data = {
            "id": dec_id,
            "no": str(item.get("no", "")),
            "applicant": (item.get("app", "") or "").strip(),
            "respondent": (item.get("resp", "") or "").strip(),
            "subject": sub_str.strip(),
            "type": (item.get("type", "") or "").strip(),
            "act": act_str.strip() if act_str != "—" else "",
            "rule": rule_str.strip() if rule_str != "—" else "",
            "use": use_str.strip(),
            "decision": dec_str.strip(),
            "actNumbers": act_nums,
            "ruleNumbers": rule_nums,
        }
        all_decisions.append(dec_data)

        for a in act_nums:
            dec_by_act.setdefault(a, []).append(dec_id)
        for r in rule_nums:
            dec_by_rule.setdefault(r, []).append(dec_id)

    data_payload = {
        "opinions": all_opinions,
        "decisions": all_decisions,
        "opsByAct": ops_by_act,
        "opsByRule": ops_by_rule,
        "decByAct": dec_by_act,
        "decByRule": dec_by_rule,
    }

    with open(JSON_OUT, "w", encoding="utf-8") as f:
        json.dump(data_payload, f, ensure_ascii=False)

    print(f"Generated {JSON_OUT} successfully (size: {os.path.getsize(JSON_OUT)} bytes).")

    ts_code = """import rawPrecedents from './legalPrecedentsData.json';

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

export const getOpinionsForAct = (actNumber: string): PrecedentOpinion[] => {
  const normalized = normalizeNum(actNumber);
  const ids = OPINIONS_BY_ACT[normalized] ?? [];
  return ids.map((id) => OPINIONS_MAP.get(id)!).filter(Boolean);
};

export const getOpinionsForRule = (ruleNumber: string): PrecedentOpinion[] => {
  const normalized = normalizeNum(ruleNumber);
  const ids = OPINIONS_BY_RULE[normalized] ?? [];
  return ids.map((id) => OPINIONS_MAP.get(id)!).filter(Boolean);
};

export const getDecisionsForAct = (actNumber: string): PrecedentDecision[] => {
  const normalized = normalizeNum(actNumber);
  const ids = DECISIONS_BY_ACT[normalized] ?? [];
  return ids.map((id) => DECISIONS_MAP.get(id)!).filter(Boolean);
};

export const getDecisionsForRule = (ruleNumber: string): PrecedentDecision[] => {
  const normalized = normalizeNum(ruleNumber);
  const ids = DECISIONS_BY_RULE[normalized] ?? [];
  return ids.map((id) => DECISIONS_MAP.get(id)!).filter(Boolean);
};
"""

    with open(TS_OUT, "w", encoding="utf-8") as f:
        f.write(ts_code)

    print(f"Generated {TS_OUT} successfully.")

if __name__ == "__main__":
    main()
