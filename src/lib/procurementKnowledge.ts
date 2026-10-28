import { ACT_CHAPTERS } from '../data/completeLawData';
import { RULE_CHAPTERS } from '../data/ruleLawData';
import { ACT_PROVISION_TEXT, RULE_PROVISION_TEXT } from '../data/lawProvisionText';
import {
  PROCUREMENT_METHODS,
  PROCUREMENT_STAGES,
  COMPLIANCE_CHECKLIST_MASTER,
  OFFICIAL_SCHEDULES,
  KEY_LEGAL_CLAUSES,
} from '../data/procurementData';
import { PROCUREMENT_DILEMMAS } from '../data/procurementDilemmasData';
import { PROCUREMENT_GLOSSARY } from '../data/procurementGlossaryData';
import { PROCUREMENT_TEMPLATES } from '../data/templatesData';
import { BIDDING_FORM_TEMPLATES } from '../data/biddingFormsData';
import { SBD_DOCUMENTS_LIST } from '../data/sbdRepositoryData';
import { EGP_GUIDELINE_SECTIONS } from '../data/egpGuidelines';
import { AMENDMENT_16_COMPARISONS } from '../data/amendmentComparisonsData';
import { ICB_FAQS } from '../data/icbProcurementData';
import { enrichedPpmoOpinions, enrichedPprcDecisions } from '../../ppmo_pprc/src/data/procurementGuideData';

export type ProcurementKnowledgeKind =
  | 'ऐन'
  | 'नियमावली'
  | 'PPMO राय'
  | 'PPRC निर्णय'
  | 'SBD/DBD कागजात'
  | 'बोलपत्र फाराम'
  | 'ढाँचा'
  | 'खरिद विधि'
  | 'चेकलिस्ट'
  | 'चरणबद्ध गाइड'
  | 'e-GP निर्देशिका'
  | 'समस्या समाधान'
  | 'शब्दावली'
  | 'अनुसूची'
  | 'संशोधन तुलना'
  | 'ICB मार्गदर्शन';

export interface ProcurementKnowledgeSource {
  id: string;
  kind: ProcurementKnowledgeKind;
  title: string;
  reference: string;
  text: string;
  route?: string;
  href?: string;
}

export interface ProcurementEvidence extends ProcurementKnowledgeSource {
  excerpt: string;
  score: number;
}

const sources: ProcurementKnowledgeSource[] = [];
const add = (source: ProcurementKnowledgeSource) => {
  const text = source.text.replace(/\s+/g, ' ').trim();
  if (text.length > 24) sources.push({ ...source, text });
};

const lawCommissionAct = 'https://lawcommission.gov.np/content/12891/12891-public-procurement-act-2063/';
const lawCommissionRules = 'https://repository.lawcommission.gov.np/np/category/documents/prevailing-law/rules-and-regulations/';
const ppmoSbdList = 'https://ppmo.gov.np/category/1207/';

const provisionKey = (reference: string) => reference
  .replace(/^(दफा|नियम)\s*/u, '')
  .replace(/[०-९]/g, (digit) => String('०१२३४५६७८९'.indexOf(digit)))
  .replace(/[.\s]/g, '');

for (const chapter of ACT_CHAPTERS) {
  for (const section of chapter.sections) {
    const key = provisionKey(section.sectionNo);
    const exactText = ACT_PROVISION_TEXT[key];
    add({
      id: `act-${section.sectionNo}`,
      kind: 'ऐन',
      title: section.title,
      reference: `सार्वजनिक खरिद ऐन, २०६३ — ${section.sectionNo}`,
      text: [exactText, section.officialSummary, section.simpleExplanation, section.complianceRule, section.practicalTip, section.amendmentNote, ...section.tags].filter(Boolean).join(' '),
      route: 'law-corpus',
      href: lawCommissionAct,
    });
  }
}

for (const chapter of RULE_CHAPTERS) {
  for (const rule of chapter.sections) {
    const key = provisionKey(rule.sectionNo);
    const exactText = RULE_PROVISION_TEXT[key];
    add({
      id: `rule-${rule.sectionNo}`,
      kind: 'नियमावली',
      title: rule.title,
      reference: `सार्वजनिक खरिद नियमावली, २०६४ — ${rule.sectionNo}`,
      text: [exactText, rule.officialSummary, rule.simpleExplanation, rule.complianceRule, rule.practicalTip, rule.amendmentNote, ...rule.tags].filter(Boolean).join(' '),
      route: 'law-corpus',
      href: lawCommissionRules,
    });
  }
}

for (const opinion of enrichedPpmoOpinions) {
  add({
    id: `ppmo-${opinion.id}`,
    kind: 'PPMO राय',
    title: opinion.cleanSubject || opinion.subject,
    reference: `PPMO राय नं. ${opinion.no}, ${opinion.date}${opinion.actRefs?.length ? ` · ${opinion.actRefs.join(', ')}` : ''}${opinion.ruleRefs?.length ? ` · ${opinion.ruleRefs.join(', ')}` : ''}`,
    text: [opinion.subject, opinion.opinion, opinion.act, opinion.rule].filter(Boolean).join(' '),
    route: 'ppmo-pprc',
  });
}

for (const decision of enrichedPprcDecisions) {
  add({
    id: `pprc-${decision.id}`,
    kind: 'PPRC निर्णय',
    title: decision.subject,
    reference: `PPRC पुनरावलोकन निर्णय नं. ${decision.no} · ${decision.type} · ${decision.act || 'ऐन दफा उल्लेख छैन'} · ${decision.rule || 'नियम उल्लेख छैन'}`,
    text: [decision.subject, decision.use, decision.decision, decision.act, decision.rule].filter(Boolean).join(' '),
    route: 'ppmo-pprc',
  });
}

for (const document of SBD_DOCUMENTS_LIST) {
  add({
    id: `sbd-${document.id}`,
    kind: 'SBD/DBD कागजात',
    title: `${document.titleNepali} (${document.titleEnglish})`,
    reference: `${document.sbdRevision} · ${document.biddingMethod} · ${document.thresholdNepali}`,
    text: [document.biddingMethod, document.thresholdNepali, document.sbdRevision, ...document.bdsHighlights.map((item) => `${item.label}: ${item.description}`), document.criticalBidderAdvice].join(' '),
    route: 'bidder-hub',
    href: document.fileUrl,
  });
}

for (const form of BIDDING_FORM_TEMPLATES) {
  add({
    id: `bid-form-${form.id}`,
    kind: 'बोलपत्र फाराम',
    title: `${form.titleNepali} (${form.titleEnglish})`,
    reference: `${form.sbdSection} · ${form.legalReference}`,
    text: `${form.description} लागू हुने विधि: ${form.applicableMethods.join(', ')}. ${form.fields.map((field) => field.label).join(', ')}. नमूना: ${form.contentTemplate(Object.fromEntries(form.fields.map((field) => [field.key, field.defaultValue])))}`,
    route: 'bidding-forms',
  });
}

for (const template of PROCUREMENT_TEMPLATES) {
  add({
    id: `template-${template.id}`,
    kind: 'ढाँचा',
    title: template.titleNepali,
    reference: template.legalReference,
    text: `${template.description} सम्बन्धित विधि: ${template.relatedMethods.join(', ')}. ${template.contentTemplate}`,
    route: 'templates',
  });
}

for (const method of PROCUREMENT_METHODS) {
  add({
    id: `method-${method.id}`,
    kind: 'खरिद विधि',
    title: `${method.nameNepali} (${method.nameEnglish})`,
    reference: `${method.legalActSection} · ${method.legalRuleSection}`,
    text: [method.summary, method.thresholdText, method.approvalAuthority, method.noticePeriodDays, method.bidSecurityRate, method.bidValidityDays, ...method.keyConditions, ...method.requiredDocuments, ...method.steps.map((step) => `${step.title}: ${step.description} (${step.legalRef})`)].join(' '),
    route: 'methods',
  });
}

for (const item of COMPLIANCE_CHECKLIST_MASTER) {
  const stage = PROCUREMENT_STAGES.find((candidate) => candidate.id === item.stageId);
  add({
    id: `checklist-${item.id}`,
    kind: 'चेकलिस्ट',
    title: item.text,
    reference: `${stage?.titleNepali || item.stageId} · ${item.legalRef}`,
    text: `${item.text} ${item.notes || ''} लागू हुने खरिद: ${item.procurementTypes.join(', ')}. ${item.isMandatory ? 'अनिवार्य पालना' : ''}`,
    route: 'checklists',
  });
}

for (const stage of PROCUREMENT_STAGES) {
  add({
    id: `stage-${stage.id}`,
    kind: 'चरणबद्ध गाइड',
    title: stage.titleNepali,
    reference: stage.legalBasis,
    text: [stage.description, stage.responsibleOfficial, stage.timeframeNotes, ...stage.keyActivities, ...stage.requiredDocuments, ...stage.criticalComplianceNotes].join(' '),
    route: 'stages',
  });
}

for (const section of EGP_GUIDELINE_SECTIONS) {
  add({
    id: `egp-${section.id}`,
    kind: 'e-GP निर्देशिका',
    title: section.title,
    reference: section.legalReference,
    text: [section.summary, ...section.actions, section.note].filter(Boolean).join(' '),
    route: 'egp-guidelines',
  });
}

for (const dilemma of PROCUREMENT_DILEMMAS) {
  add({
    id: `dilemma-${dilemma.id}`,
    kind: 'समस्या समाधान',
    title: dilemma.question,
    reference: `${dilemma.legalClauses.join(', ')} · ${dilemma.ppmoPprcPrecedent}`,
    text: [dilemma.scenario, dilemma.verdict, ...dilemma.stepByStep, dilemma.doNotDo, dilemma.minuteSnippet].join(' '),
    route: 'dilemma-solver',
  });
}

for (const term of PROCUREMENT_GLOSSARY) {
  add({
    id: `glossary-${term.id}`,
    kind: 'शब्दावली',
    title: `${term.termNepali} (${term.termEnglish})`,
    reference: term.legalReference,
    text: [term.shortDefinition, term.detailedExplanation, term.practicalExample, term.auditProTip, term.commonMisconceptions].filter(Boolean).join(' '),
    route: 'glossary',
  });
}

for (const schedule of OFFICIAL_SCHEDULES) {
  add({
    id: `schedule-${schedule.id}`,
    kind: 'अनुसूची',
    title: schedule.title,
    reference: schedule.ruleReference,
    text: [schedule.description, ...schedule.fields, schedule.sampleNotes].filter(Boolean).join(' '),
    route: 'schedules',
  });
}

for (const amendment of AMENDMENT_16_COMPARISONS) {
  add({
    id: `amendment-${amendment.id}`,
    kind: 'संशोधन तुलना',
    title: amendment.topic,
    reference: `${amendment.actSection || ''} · नियम ${amendment.ruleNumber} · ${amendment.badge}`,
    text: [amendment.beforeText, amendment.afterText, amendment.auditRisk, ...amendment.thresholds.map((item) => `${item.label}: ${item.oldValue} → ${item.newValue}`), amendment.practicalTakeaway].join(' '),
    route: 'amendments',
  });
}

for (const clause of KEY_LEGAL_CLAUSES) {
  add({
    id: `clause-${clause.id}`,
    kind: 'ऐन',
    title: clause.title,
    reference: clause.clauseNumber,
    text: `${clause.summary} ${clause.tags.join(', ')}`,
    route: 'clauses',
    href: lawCommissionAct,
  });
}

for (const faq of ICB_FAQS) {
  add({
    id: `icb-faq-${faq.q.slice(0, 32)}`,
    kind: 'ICB मार्गदर्शन',
    title: faq.q,
    reference: 'अन्तर्राष्ट्रिय प्रतिस्पर्धात्मक बोलपत्र (ICB)',
    text: faq.a,
    route: 'icb-guide',
  });
}

const toAsciiDigits = (value: string) => value.replace(/[०-९]/g, (digit) => String('०१२३४५६७८९'.indexOf(digit)));
const normalize = (value: string) => toAsciiDigits(value).toLocaleLowerCase('ne-NP').normalize('NFKC').replace(/[^\p{L}\p{N}]+/gu, ' ').replace(/\s+/g, ' ').trim();
const stopWords = new Set(['के', 'कसरी', 'किन', 'हो', 'हुन्छ', 'छ', 'मा', 'को', 'का', 'कि', 'र', 'वा', 'तथा', 'गर्न', 'गर्ने', 'बारे', 'सम्बन्धमा', 'कुन', 'the', 'a', 'an', 'is', 'are', 'what', 'how', 'does', 'do', 'for', 'of', 'in', 'on', 'and', 'or', 'to']);

const aliases: Record<string, string[]> = {
  bid: ['बोलपत्र'], tender: ['बोलपत्र'], bidding: ['बोलपत्र'], procurement: ['खरिद'],
  variation: ['भेरिएसन'], variationorder: ['भेरिएसन'], blacklist: ['कालोसूची'], blacklisting: ['कालोसूची'],
  'bid security': ['बोलपत्र जमानत'], bidbond: ['बोलपत्र जमानत'], performancebond: ['कार्यसम्पादन जमानत'],
  responsiveness: ['प्रभावग्राही'], qualification: ['योग्यता'], turnover: ['कारोबार'], extension: ['म्याद थप'],
  'single bid': ['एक मात्र बोलपत्र'], directpurchase: ['सोझै खरिद'], quotation: ['दरभाउपत्र'],
  'standard bidding document': ['SBD'], sbd: ['बिडिङ डकुमेन्ट'], dbd: ['बिडिङ डकुमेन्ट'],
  procurementact: ['सार्वजनिक खरिद ऐन'], procurementrules: ['सार्वजनिक खरिद नियमावली'],
};

const index = sources.map((source) => ({ source, normalized: normalize(`${source.title} ${source.reference} ${source.text}`) }));

export function searchProcurementKnowledge(query: string, limit = 6): ProcurementEvidence[] {
  const normalizedQuery = normalize(query).slice(0, 240);
  const rawTerms = normalizedQuery.split(' ').filter((term) => term.length > 1 && !stopWords.has(term));
  const expandedTerms = new Set(rawTerms);
  for (const [term, expansions] of Object.entries(aliases)) {
    if (normalizedQuery.includes(normalize(term))) expansions.forEach((value) => expandedTerms.add(normalize(value)));
  }
  const terms = Array.from(expandedTerms);
  if (terms.length === 0) return [];

  const referenceMatch = normalizedQuery.match(/(?:दफा|नियम|section|rule)\s*([0-9]+\s*[क-ज्ञ]?)/u)?.[1]?.replace(/\s/g, '');
  const scored = index.map(({ source, normalized }) => {
    let score = 0;
    let matches = 0;
    for (const term of terms) {
      if (normalized.includes(term)) {
        score += term.length <= 2 ? 0.7 : 1.7;
        matches += 1;
      }
    }
    if (referenceMatch && normalize(source.reference).includes(normalize(referenceMatch))) score += 7;
    if (source.kind === 'ऐन' || source.kind === 'नियमावली') score *= 1.12;
    if (source.kind === 'PPMO राय' || source.kind === 'PPRC निर्णय') score *= 1.06;
    return { source, normalized, score: matches > 0 || referenceMatch ? score : 0 };
  }).filter((item) => item.score >= 1.7);

  scored.sort((left, right) => right.score - left.score);
  const seen = new Set<string>();
  return scored.filter(({ source }) => {
    if (seen.has(source.id)) return false;
    seen.add(source.id);
    return true;
  }).slice(0, Math.min(Math.max(limit, 1), 8)).map(({ source, normalized, score }) => {
    const maxChars = source.kind === 'ऐन' || source.kind === 'नियमावली' ? 1800 : 1400;
    let excerpt = source.text.slice(0, maxChars);
    const bestTerm = terms.sort((a, b) => normalized.indexOf(a) - normalized.indexOf(b)).find((term) => normalized.includes(term));
    if (source.text.length > maxChars && bestTerm) {
      const position = normalize(source.text).indexOf(bestTerm);
      if (position > Math.round(maxChars * 0.4)) {
        const start = Math.max(0, position - Math.round(maxChars * 0.3));
        excerpt = `…${source.text.slice(start, start + maxChars)}`;
      }
    }
    return { ...source, excerpt, score };
  });
}

export function createLocalSourceAnswer(evidence: ProcurementEvidence[]): string {
  if (evidence.length === 0) {
    return 'एपमा अनुक्रमित ऐन/नियम, SBD/DBD, PPMO राय, PPRC निर्णय वा अन्य सामग्रीमा यो प्रश्नको प्रत्यक्ष आधार भेटिएन। अनुमान गरेर कानुनी उत्तर दिनुभन्दा सम्बन्धित बोलपत्र कागजात र पछिल्लो आधिकारिक स्रोत जाँच्नुहोस्।';
  }
  return 'AI उत्तर सेवा हाल उपलब्ध छैन। तल एपमा रहेको सामग्रीबाट सबैभन्दा नजिकका अंशहरू राखेको छु; यी अंशलाई प्रश्नको पूर्ण कानुनी राय नमान्नुहोस्।\n\n' + evidence.slice(0, 3).map((item, index) => `[${index + 1}] ${item.reference}\n${item.excerpt}`).join('\n\n');
}

export const PROCUREMENT_OFFICIAL_LINKS = [
  { label: 'हालको सार्वजनिक खरिद ऐन र संशोधन', href: 'https://www.ppmo.gov.np/content/13336/public-procurement--second-amendment--act--2083/' },
  { label: 'हालको नियमावली संशोधन', href: 'https://ppmo.gov.np/content/13339/public-procurement--fifteenth-amendment--rules--2083/' },
  { label: 'PPMO को पछिल्लो SBD/DBD सूची', href: ppmoSbdList },
  { label: 'नेपाल कानून आयोग — सार्वजनिक खरिद ऐन', href: lawCommissionAct },
  { label: 'नेपाल कानून आयोग — नियमावली', href: lawCommissionRules },
];
