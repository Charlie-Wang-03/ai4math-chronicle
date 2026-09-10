export type Locale = 'en' | 'zh-CN';
export type LocalizedText = Record<Locale, string>;
export type EventType = 'discovery' | 'proof' | 'formalization' | 'competition' | 'system' | 'benchmark' | 'dataset' | 'infrastructure' | 'controversy';
export type Significance = 'H1' | 'H2' | 'H3';
export type VerificationStatus = 'claimed' | 'paper_released' | 'under_verification' | 'partially_verified' | 'independently_verified' | 'disputed' | 'corrected' | 'retracted';
export type EvidenceLevel = 'E0' | 'E1' | 'E2' | 'E3' | 'E4';
export type FormalAssurance = 'none' | 'artifact_available' | 'machine_checked' | 'independently_replayed';
export type AiRole = 'autonomous_primary' | 'ai_primary_human_verified' | 'human_ai_collaboration' | 'ai_substantive_support' | 'ai_minor_support' | 'computation_only' | 'literature_assistance' | 'unclear';

export interface ChronicleSource {
  id: string;
  tier: 'S1' | 'S2' | 'S3' | 'S4' | 'S5';
  type: string;
  title: string;
  url: string;
  primary: boolean;
  published_date: string | null;
  accessed_at: string;
}

export interface ChronicleArtifact {
  id: string;
  kind: string;
  title: string;
  url: string;
}

export interface ChronicleEvent {
  schema_version: 1;
  id: string;
  slug: string;
  title: LocalizedText;
  dates: {
    event: string;
    first_public_claim: string | null;
    paper_release: string | null;
    artifact_release: string | null;
    independently_verified: string | null;
    added_to_chronicle: string;
    last_updated: string;
  };
  event_types: EventType[];
  significance: { tier: Significance; rationale: LocalizedText };
  mathematical_novelty: { type: string };
  interfaces: string[];
  claim: LocalizedText;
  summary: LocalizedText;
  why_it_matters: LocalizedText;
  ai_role: { level: AiRole; description: LocalizedText };
  human_contribution: { description: LocalizedText };
  systems: string[];
  organizations: string[];
  people: string[];
  problems: string[];
  methods: string[];
  verification: {
    evidence_level: EvidenceLevel;
    status: VerificationStatus;
    formal_assurance: FormalAssurance;
    history: Array<{ date: string; status: VerificationStatus; evidence_level: EvidenceLevel; note: LocalizedText }>;
  };
  sources: ChronicleSource[];
  artifacts: ChronicleArtifact[];
  relationships: { predecessors: string[]; successors: string[]; related: string[] };
  timeline: { featured: boolean; significance: 'primary' | 'context' };
  tags: string[];
  editorial: { created_at: string; last_reviewed: string; reviewers: string[] };
  corrections: Array<{ date: string; summary: LocalizedText; source_ids: string[] }>;
}
