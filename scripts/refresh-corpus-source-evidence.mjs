import fs from 'node:fs';
import path from 'node:path';
import { load } from 'js-yaml';
import { ROOT } from './lib/events.mjs';

const REVIEW_DATE = '2026-09-11';
const EVENTS_DIR = path.join(ROOT, 'data', 'events');

const patches = {
  '2021-02-11-pact-proof-artifact-cotraining.yaml': {
    source: ['github-pact-lean-step-public', 'S1', 'repository', 'PACT LeanStep proof-artifact extraction code', 'https://github.com/jesse-michael-han/lean-step-public'],
    artifact: ['pact-lean-step-public', 'code', 'LeanStep proof-artifact extraction code used for PACT', 'https://github.com/jesse-michael-han/lean-step-public'],
    formalAssurance: 'artifact_available',
  },
  '2021-03-05-math-competition-problem-benchmark.yaml': {
    source: ['github-math-dataset', 'S1', 'repository', 'MATH dataset repository and evaluation code', 'https://github.com/hendrycks/math'],
    artifact: ['math-dataset-repository', 'dataset', 'MATH dataset loaders and evaluation code', 'https://github.com/hendrycks/math'],
  },
  '2022-05-23-hypertree-proof-search.yaml': {
    source: ['github-evariste-htps', 'S1', 'repository', 'Evariste code accompanying HyperTree Proof Search', 'https://github.com/facebookresearch/Evariste'],
    artifact: ['htps-evariste-code', 'code', 'Evariste HyperTree Proof Search research artifact', 'https://github.com/facebookresearch/Evariste'],
  },
  '2022-10-21-draft-sketch-prove-informal-guidance.yaml': {
    source: ['github-draft-sketch-prove', 'S1', 'repository', 'Draft, Sketch, and Prove implementation and result artifacts', 'https://github.com/albertqjiang/draft_sketch_prove'],
    artifact: ['draft-sketch-prove-code', 'code', 'Draft, Sketch, and Prove implementation and result files', 'https://github.com/albertqjiang/draft_sketch_prove'],
  },
  '2023-02-24-proofnet-autoformalization-benchmark.yaml': {
    source: ['github-proofnet', 'S1', 'repository', 'ProofNet benchmark and replication repository', 'https://github.com/zhangir-azerbayev/ProofNet'],
    artifact: ['proofnet-repository', 'dataset', 'ProofNet benchmark and replication code', 'https://github.com/zhangir-azerbayev/ProofNet'],
  },
  '2023-09-29-tora-tool-integrated-math-reasoning.yaml': {
    source: ['github-microsoft-tora', 'S1', 'repository', 'ToRA training, inference and evaluation repository', 'https://github.com/microsoft/ToRA'],
    artifact: ['tora-repository', 'code', 'ToRA code, evaluation outputs and model links', 'https://github.com/microsoft/ToRA'],
    formalAssurance: 'artifact_available',
  },
  '2023-10-16-llemma-open-math-language-model.yaml': {
    source: ['github-eleutherai-math-lm', 'S1', 'repository', 'Llemma models, Proof-Pile-2 data and training code repository', 'https://github.com/EleutherAI/math-lm'],
    artifact: ['llemma-math-lm-repository', 'code', 'Llemma code, model and Proof-Pile-2 data links', 'https://github.com/EleutherAI/math-lm'],
  },
  '2024-02-05-deepseekmath-grpo-open-math-model.yaml': {
    source: ['github-deepseek-math', 'S1', 'repository', 'DeepSeekMath code, evaluation and model release repository', 'https://github.com/deepseek-ai/DeepSeek-Math'],
    artifact: ['deepseekmath-repository', 'code', 'DeepSeekMath evaluation code and model links', 'https://github.com/deepseek-ai/DeepSeek-Math'],
  },
  '2024-02-09-internlm-math-verifiable-reasoning.yaml': {
    source: ['github-internlm-math', 'S1', 'repository', 'InternLM-Math models, evaluation code and formal-math resources', 'https://github.com/InternLM/InternLM-Math'],
    artifact: ['internlm-math-repository', 'code', 'InternLM-Math models and evaluation resources', 'https://github.com/InternLM/InternLM-Math'],
  },
  '2024-02-21-olympiadbench-bilingual-multimodal.yaml': {
    source: ['github-olympiadbench', 'S1', 'repository', 'OlympiadBench dataset and evaluation repository', 'https://github.com/OpenBMB/OlympiadBench'],
    artifact: ['olympiadbench-repository', 'dataset', 'OlympiadBench dataset and evaluation code', 'https://github.com/OpenBMB/OlympiadBench'],
  },
  '2024-06-06-lean-workbook-synthetic-formalization-dataset.yaml': {
    source: ['huggingface-lean-workbook', 'S1', 'dataset', 'Lean Workbook dataset release', 'https://huggingface.co/datasets/internlm/Lean-Workbook'],
    artifact: ['lean-workbook-dataset', 'dataset', 'Lean Workbook formal-informal dataset', 'https://huggingface.co/datasets/internlm/Lean-Workbook'],
  },
  '2024-07-11-numinamath-aimo-progress-prize.yaml': {
    source: ['github-numinamath-aimo', 'S1', 'repository', 'Numina solution to the first AIMO Progress Prize', 'https://github.com/project-numina/aimo-progress-prize'],
    artifact: ['numinamath-aimo-repository', 'code', 'NuminaMath winning-solution training and inference code', 'https://github.com/project-numina/aimo-progress-prize'],
    formalAssurance: 'artifact_available',
  },
  '2024-07-15-putnambench-formal-undergraduate-competition.yaml': {
    source: ['github-putnambench', 'S1', 'repository', 'PutnamBench formal benchmark repository', 'https://github.com/trishullab/PutnamBench'],
    artifact: ['putnambench-repository', 'dataset', 'PutnamBench Lean, Isabelle and Coq formalizations', 'https://github.com/trishullab/PutnamBench'],
  },
  '2024-08-05-minictx-long-context-theorem-proving.yaml': {
    source: ['github-minictx-eval', 'S1', 'repository', 'miniCTX evaluation repository', 'https://github.com/cmu-l3/minictx-eval'],
    artifact: ['minictx-eval-repository', 'dataset', 'miniCTX benchmark and evaluation resources', 'https://github.com/cmu-l3/minictx-eval'],
  },
  '2024-10-10-omni-math-olympiad-benchmark.yaml': {
    source: ['github-omni-math', 'S1', 'repository', 'Official Omni-MATH benchmark repository', 'https://github.com/KbsdJames/Omni-MATH'],
    artifact: ['omni-math-repository', 'dataset', 'Omni-MATH dataset and evaluation code', 'https://github.com/KbsdJames/Omni-MATH'],
  },
  '2024-10-21-internlm-step-prover-expert-iteration.yaml': {
    source: ['github-internlm-math-stepprover', 'S1', 'repository', 'InternLM-Math repository containing StepProver release links and resources', 'https://github.com/InternLM/InternLM-Math'],
    artifact: ['internlm-stepprover-model', 'model', 'InternLM2.5-Step-Prover model release', 'https://huggingface.co/internlm/internlm2_5-step-prover'],
  },
  '2024-11-08-frontiermath-research-level-benchmark.yaml': {
    artifact: ['frontiermath-benchmark', 'dataset', 'FrontierMath benchmark surface', 'https://epoch.ai/frontiermath/tiers-1-4/the-benchmark'],
  },
  '2025-01-22-deepseek-r1-reinforcement-learning-reasoning.yaml': {
    source: ['github-deepseek-r1', 'S1', 'repository', 'DeepSeek-R1 model and technical release repository', 'https://github.com/deepseek-ai/DeepSeek-R1'],
    artifact: ['deepseek-r1-repository', 'model', 'DeepSeek-R1 model release and technical artifacts', 'https://github.com/deepseek-ai/DeepSeek-R1'],
  },
  '2025-04-30-deepseek-prover-v2-subgoal-rl.yaml': {
    source: ['github-deepseek-prover-v2', 'S1', 'repository', 'DeepSeek-Prover-V2 models, benchmark and solution artifacts', 'https://github.com/deepseek-ai/DeepSeek-Prover-V2'],
    artifact: ['deepseek-prover-v2-repository', 'code', 'DeepSeek-Prover-V2 models, benchmark and proof artifacts', 'https://github.com/deepseek-ai/DeepSeek-Prover-V2'],
  },
  '2025-07-31-seed-prover-deep-broad-formal-reasoning.yaml': {
    source: ['github-seed-prover', 'S1', 'repository', 'Seed-Prover formal theorem-proving repository', 'https://github.com/ByteDance-Seed/Seed-Prover'],
    artifact: ['seed-prover-repository', 'proof', 'Seed-Prover code and IMO 2025 formal proof artifacts', 'https://github.com/ByteDance-Seed/Seed-Prover'],
  },
  '2025-08-05-goedel-prover-v2-self-correction.yaml': {
    source: ['github-goedel-prover-v2', 'S1', 'repository', 'Goedel-Prover-V2 model and theorem-proving repository', 'https://github.com/Goedel-LM/Goedel-Prover-V2'],
    artifact: ['goedel-prover-v2-repository', 'code', 'Goedel-Prover-V2 model and evaluation artifacts', 'https://github.com/Goedel-LM/Goedel-Prover-V2'],
  },
  '2025-10-01-aristotle-imo-level-formal-theorem-proving.yaml': {
    source: ['github-harmonic-imo2025', 'S1', 'formal_artifact', 'Harmonic Aristotle IMO 2025 Lean proofs', 'https://github.com/harmonic-ai/IMO2025'],
    artifact: ['aristotle-imo2025-lean', 'proof', 'Aristotle Lean statements and proofs for IMO 2025 Problems 1–5', 'https://github.com/harmonic-ai/IMO2025'],
  },
  '2026-07-31-frontiermath-open-problems-50.yaml': {
    artifact: ['frontiermath-open-problems-benchmark', 'dataset', 'FrontierMath: Open Problems benchmark surface', 'https://epoch.ai/frontiermath/open-problems?notability=Moderately+interesting'],
  },
};

function quote(value) {
  return JSON.stringify(value);
}

function sourceBlock([id, tier, type, title, url]) {
  return [
    `- id: ${id}`,
    `  tier: ${tier}`,
    `  type: ${type}`,
    `  title: ${quote(title)}`,
    `  url: ${url}`,
    '  primary: true',
    '  published_date: null',
    `  accessed_at: '${REVIEW_DATE}'`,
  ].join('\n');
}

function artifactBlock([id, kind, title, url]) {
  return [
    `- id: ${id}`,
    `  kind: ${kind}`,
    `  title: ${quote(title)}`,
    `  url: ${url}`,
  ].join('\n');
}

function insertSource(text, source) {
  if (!source) return text;
  const url = source[4];
  if (text.includes(url)) return text;
  if (!/\nsources:\n/.test(text)) throw new Error('missing sources block');
  return text.replace(/\nartifacts:/, `\n${sourceBlock(source)}\nartifacts:`);
}

function insertArtifact(text, artifact) {
  if (!artifact) return text;
  const url = artifact[3];
  const artifactSection = text.split(/\nrelationships:/)[0].split(/\nartifacts:/)[1] ?? '';
  if (artifactSection.includes(url)) return text;
  if (text.includes('\nartifacts: []')) {
    return text.replace('\nartifacts: []', `\nartifacts:\n${artifactBlock(artifact)}`);
  }
  return text.replace(/\nrelationships:/, `\n${artifactBlock(artifact)}\nrelationships:`);
}

function strengthenEvidence(text, data, patch) {
  if (!patch.source && !patch.artifact) return text;
  if (data.verification?.evidence_level !== 'E2') return text;
  const status = data.verification.status;
  text = text.replace(/verification:\n  evidence_level: E2\n/, 'verification:\n  evidence_level: E3\n');
  const historyEntry = [
    `  - date: '${REVIEW_DATE}'`,
    `    status: ${status}`,
    '    evidence_level: E3',
    '    note:',
    '      en: >-',
    '        This corpus refresh added a directly inspectable public artifact maintained by the authors or releasing organization. E3 records artifact-level inspectability and does not imply independent verification of the underlying scientific or mathematical claim.',
    '      zh-CN: >-',
    '        本轮 corpus 刷新增补了由作者或发布机构维护、可直接检查的公开产物。E3 表示证据已达到可检查 artifact 层级，并不等同于底层科学或数学主张已获得独立验证。',
  ].join('\n');
  text = text.replace(/\nsources:/, `\n${historyEntry}\nsources:`);
  return text;
}

function updateReviewStamp(text) {
  if (!/editorial:[\s\S]*?last_reviewed:/.test(text)) throw new Error('missing editorial.last_reviewed');
  return text.replace(/(editorial:[\s\S]*?last_reviewed:)\s*["']?\d{4}-\d{2}-\d{2}["']?/, `$1 '${REVIEW_DATE}'`);
}

function updateLastUpdated(text) {
  return text.replace(/(\n  last_updated:)\s*["']?\d{4}-\d{2}-\d{2}["']?/, `$1 '${REVIEW_DATE}'`);
}

function updateFormalAssurance(text, value) {
  if (!value) return text;
  return text.replace(/(\n  formal_assurance:)\s*\S+/, `$1 ${value}`);
}

const files = fs.readdirSync(EVENTS_DIR).filter((name) => name.endsWith('.yaml')).sort();
if (files.length !== 52) throw new Error(`Expected 52 event records, found ${files.length}`);

let substantive = 0;
for (const file of files) {
  const filePath = path.join(EVENTS_DIR, file);
  const before = fs.readFileSync(filePath, 'utf8');
  const data = load(before);
  if (!data?.id || !data?.editorial) throw new Error(`Malformed event: ${file}`);
  let after = updateReviewStamp(before);
  const patch = patches[file];
  if (patch) {
    after = strengthenEvidence(after, data, patch);
    after = updateFormalAssurance(after, patch.formalAssurance);
    after = insertSource(after, patch.source);
    after = insertArtifact(after, patch.artifact);
    after = updateLastUpdated(after);
    substantive += 1;
  }
  fs.writeFileSync(filePath, after);
}

console.log(`Reviewed ${files.length}/52 canonical Events; substantively strengthened ${substantive}.`);
