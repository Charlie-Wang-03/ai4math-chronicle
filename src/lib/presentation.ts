import type { Locale } from './types';

type LabelPair = Record<Locale, string>;

type PresentationCategory =
  | 'event_type'
  | 'significance'
  | 'verification'
  | 'evidence_level'
  | 'formal_assurance'
  | 'mathematical_novelty'
  | 'ai_role'
  | 'interface'
  | 'source_type'
  | 'source_tier'
  | 'artifact_kind';

type SummarySurface = 'collection' | 'record_lede';

const SUMMARY_BUDGETS: Record<SummarySurface, Record<Locale, number>> = {
  collection: { en: 210, 'zh-CN': 120 },
  record_lede: { en: 300, 'zh-CN': 180 },
};

const LABELS: Record<PresentationCategory, Record<string, LabelPair>> = {
  event_type: {
    discovery: { en: 'Discovery', 'zh-CN': '数学发现' },
    proof: { en: 'Proof', 'zh-CN': '证明' },
    formalization: { en: 'Formalization', 'zh-CN': '形式化' },
    competition: { en: 'Competition', 'zh-CN': '竞赛' },
    system: { en: 'System', 'zh-CN': '系统' },
    benchmark: { en: 'Benchmark', 'zh-CN': '基准' },
    dataset: { en: 'Dataset', 'zh-CN': '数据集' },
    infrastructure: { en: 'Infrastructure', 'zh-CN': '基础设施' },
    controversy: { en: 'Controversy', 'zh-CN': '争议' },
  },
  significance: {
    H1: { en: 'H1 · Historical milestone', 'zh-CN': 'H1 · 历史里程碑' },
    H2: { en: 'H2 · Field milestone', 'zh-CN': 'H2 · 领域里程碑' },
    H3: { en: 'H3 · Context event', 'zh-CN': 'H3 · 背景事件' },
  },
  verification: {
    claimed: { en: 'Claimed', 'zh-CN': '尚属声明' },
    paper_released: { en: 'Paper released', 'zh-CN': '论文已发布' },
    under_verification: { en: 'Under verification', 'zh-CN': '核验中' },
    partially_verified: { en: 'Partially verified', 'zh-CN': '部分核验' },
    independently_verified: { en: 'Independently corroborated', 'zh-CN': '已有独立佐证' },
    disputed: { en: 'Disputed', 'zh-CN': '存在争议' },
    corrected: { en: 'Corrected', 'zh-CN': '已更正' },
    retracted: { en: 'Retracted', 'zh-CN': '已撤回' },
  },
  evidence_level: {
    E0: { en: 'E0 · Unsubstantiated', 'zh-CN': 'E0 · 尚无实质证据' },
    E1: { en: 'E1 · Primary claim', 'zh-CN': 'E1 · 原始声明' },
    E2: { en: 'E2 · Research record', 'zh-CN': 'E2 · 研究记录' },
    E3: { en: 'E3 · Inspectable artifact', 'zh-CN': 'E3 · 可检查工件' },
    E4: { en: 'E4 · Independent check', 'zh-CN': 'E4 · 独立检查' },
  },
  formal_assurance: {
    none: { en: 'No formal assurance', 'zh-CN': '无形式保障' },
    artifact_available: { en: 'Artifact available', 'zh-CN': '有形式化工件' },
    machine_checked: { en: 'Machine-checked', 'zh-CN': '机器检查' },
    independently_replayed: { en: 'Independently replayed', 'zh-CN': '已独立复现' },
  },
  mathematical_novelty: {
    new_result: { en: 'New result', 'zh-CN': '新结果' },
    new_proof: { en: 'New proof', 'zh-CN': '新证明' },
    new_algorithm: { en: 'New algorithm', 'zh-CN': '新算法' },
    new_conjecture: { en: 'New conjecture', 'zh-CN': '新猜想' },
    formalization_of_known_result: { en: 'Formalization of known result', 'zh-CN': '已知结果形式化' },
    rediscovery: { en: 'Rediscovery', 'zh-CN': '重新发现' },
    benchmark_result: { en: 'Benchmark result', 'zh-CN': '基准结果' },
    tooling_only: { en: 'Tooling only', 'zh-CN': '工具性进展' },
  },
  ai_role: {
    autonomous_primary: { en: 'Autonomous primary role', 'zh-CN': 'AI 自主主导' },
    ai_primary_human_verified: { en: 'AI primary, human verified', 'zh-CN': 'AI 主导、人类核验' },
    human_ai_collaboration: { en: 'Human–AI collaboration', 'zh-CN': '人机协作' },
    ai_substantive_support: { en: 'Substantive AI support', 'zh-CN': 'AI 实质性支持' },
    ai_minor_support: { en: 'Minor AI support', 'zh-CN': 'AI 辅助' },
    computation_only: { en: 'Computation only', 'zh-CN': '仅计算支持' },
    literature_assistance: { en: 'Literature assistance', 'zh-CN': '文献辅助' },
    unclear: { en: 'Unclear', 'zh-CN': '尚不明确' },
  },
  interface: {
    informal: { en: 'Informal', 'zh-CN': '非形式化' },
    formal: { en: 'Formal', 'zh-CN': '形式化' },
    symbolic: { en: 'Symbolic', 'zh-CN': '符号' },
    numeric: { en: 'Numeric', 'zh-CN': '数值' },
    hybrid: { en: 'Hybrid', 'zh-CN': '混合' },
  },
  source_type: {
    paper: { en: 'Paper', 'zh-CN': '论文' },
    official_announcement: { en: 'Official announcement', 'zh-CN': '官方公告' },
    repository: { en: 'Repository', 'zh-CN': '代码仓库' },
    formal_artifact: { en: 'Formal artifact', 'zh-CN': '形式化工件' },
    dataset: { en: 'Dataset', 'zh-CN': '数据集' },
    benchmark: { en: 'Benchmark', 'zh-CN': '基准' },
    independent_analysis: { en: 'Independent analysis', 'zh-CN': '独立分析' },
    media: { en: 'Media report', 'zh-CN': '媒体报道' },
    community: { en: 'Community source', 'zh-CN': '社区来源' },
    other: { en: 'Other source', 'zh-CN': '其他来源' },
  },
  source_tier: {
    S1: { en: 'S1 · Primary research', 'zh-CN': 'S1 · 主要研究来源' },
    S2: { en: 'S2 · Official institutional', 'zh-CN': 'S2 · 官方机构来源' },
    S3: { en: 'S3 · Independent scholarly', 'zh-CN': 'S3 · 独立学术来源' },
    S4: { en: 'S4 · Reputable secondary', 'zh-CN': 'S4 · 可信二手来源' },
    S5: { en: 'S5 · Community signal', 'zh-CN': 'S5 · 社区信号' },
  },
  artifact_kind: {
    code: { en: 'Code', 'zh-CN': '代码' },
    proof: { en: 'Proof artifact', 'zh-CN': '证明工件' },
    dataset: { en: 'Dataset', 'zh-CN': '数据集' },
    benchmark: { en: 'Benchmark', 'zh-CN': '基准' },
    model: { en: 'Model', 'zh-CN': '模型' },
    supplement: { en: 'Supplement', 'zh-CN': '补充材料' },
    other: { en: 'Other artifact', 'zh-CN': '其他工件' },
  },
};

export function presentationLabel(category: PresentationCategory, value: string, locale: Locale): string {
  return LABELS[category][value]?.[locale] ?? value.replaceAll('_', ' ');
}

export function presentationOptions(category: PresentationCategory, values: string[], locale: Locale) {
  return values.map((value) => ({ value, label: presentationLabel(category, value, locale) }));
}

export function presentationExcerpt(value: string, locale: Locale, surface: SummarySurface = 'collection'): string {
  const normalized = value.replace(/\s+/gu, ' ').trim();
  const limit = SUMMARY_BUDGETS[surface][locale];
  if (normalized.length <= limit) return normalized;

  const sentenceEnd = /[.!?。！？]/u;
  const minimumCompleteSentence = Math.floor(limit * 0.45);
  let lastSentenceEnd = -1;
  for (let index = 0; index < limit; index += 1) {
    if (sentenceEnd.test(normalized[index] ?? '')) lastSentenceEnd = index + 1;
  }
  if (lastSentenceEnd >= minimumCompleteSentence) return normalized.slice(0, lastSentenceEnd).trim();

  const candidate = normalized.slice(0, limit);
  const breakCharacters = [' ', '，', '；', ',', ';', '：', ':'];
  const preferredBreak = Math.max(...breakCharacters.map((character) => candidate.lastIndexOf(character)));
  const cut = preferredBreak >= Math.floor(limit * 0.65) ? preferredBreak : limit;
  return `${normalized.slice(0, cut).trimEnd().replace(/[,:;，；：]+$/u, '')}…`;
}
