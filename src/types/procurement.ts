export type ProcurementType = 'works' | 'goods' | 'consulting' | 'services';

export interface ProcurementMethod {
  id: string;
  nameNepali: string;
  nameEnglish: string;
  category: ProcurementType[];
  thresholdText: string;
  minAmount?: number;
  maxAmount?: number;
  legalActSection: string;
  legalRuleSection: string;
  noticePeriodDays: string;
  approvalAuthority: string;
  bidSecurityRate: string;
  bidValidityDays: string;
  performanceSecurityRate: string;
  summary: string;
  keyConditions: string[];
  steps: {
    stepNo: number;
    title: string;
    description: string;
    legalRef: string;
    timeline?: string;
  }[];
  requiredDocuments: string[];
  cautions: string[];
  badgeTag: string;
}

export interface StatutoryRule {
  clauseOrRule: string;
  title: string;
  provision: string;
  mandatoryAction: string;
  penaltyOrRisk?: string;
}

export interface PpmoOpinionItem {
  id: string;
  dateOrRef?: string;
  topic: string;
  questionOrContext: string;
  directive: string;
  entityAction: string;
}

export interface PprcPrecedentItem {
  id: string;
  caseNoOrRef: string;
  appellantVsResp?: string;
  disputedIssue: string;
  rulingOrPrecedent: string;
  entityLesson: string;
}

export interface AuditRiskItem {
  riskTitle: string;
  authority: 'CIAA' | 'OAG' | 'BOTH';
  commonIrregularity: string;
  preventiveMeasure: string;
}

export interface StageChecklistItem {
  id: string;
  title: string;
  legalBasis: string;
  responsibleRole: string;
  tip: string;
}

export interface StageDosAndDonts {
  dos: string[];
  donts: string[];
}

export interface ProcurementStage {
  id: string;
  stageNo: number;
  titleNepali: string;
  titleEnglish: string;
  description: string;
  legalBasis: string;
  keyActivities: string[];
  requiredDocuments: string[];
  timeframeNotes: string;
  responsibleOfficial: string;
  criticalComplianceNotes: string[];
  statutoryRules?: StatutoryRule[];
  ppmoOpinions?: PpmoOpinionItem[];
  pprcDecisions?: PprcPrecedentItem[];
  auditRisks?: AuditRiskItem[];
  entityChecklist?: StageChecklistItem[];
  dosAndDonts?: StageDosAndDonts;
}

export interface ChecklistItem {
  id: string;
  stageId: string;
  text: string;
  legalRef: string;
  procurementTypes: ProcurementType[];
  isMandatory: boolean;
  notes?: string;
}

export interface TrackedProject {
  id: string;
  title: string;
  officeName: string;
  procurementType: ProcurementType;
  methodId: string;
  estimatedAmount: number;
  currentStageId: string;
  progressPercent: number;
  budgetSource: string;
  startDate: string;
  targetCompletionDate: string;
  contractorName?: string;
  contractAmount?: number;
  checklistStatus: Record<string, boolean>; // checklist item id -> checked
  notes?: string;
}

export interface LegalClause {
  id: string;
  lawType: 'act' | 'rule';
  clauseNumber: string;
  title: string;
  summary: string;
  category: ProcurementType[] | 'general';
  tags: string[];
}

export interface ScheduleItem {
  id: string;
  scheduleNumber: string;
  ruleReference: string;
  title: string;
  description: string;
  fields: string[];
  sampleNotes?: string;
}
