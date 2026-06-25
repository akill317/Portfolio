import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const portfolioRoot = path.resolve(scriptDir, '..');
const configPath = path.join(scriptDir, 'long-dashboard.config.json');

function loadConfig() {
  const defaults = {
    backtraderRoot: '../Backtrader',
    outHtml: 'public/long/index.html',
  };
  if (!fs.existsSync(configPath)) {
    return defaults;
  }
  const userConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  return { ...defaults, ...userConfig };
}

function resolvePython() {
  if (process.env.PYTHON) {
    return process.env.PYTHON;
  }
  const candidates = ['py', 'python', 'python3'];
  for (const cmd of candidates) {
    const probe = spawnSync(cmd, ['--version'], { encoding: 'utf8' });
    if (probe.status === 0) {
      return cmd;
    }
  }
  throw new Error('未找到 Python，请设置 PYTHON 环境变量');
}

function pythonArgs(python, scriptPath, passthroughArgs, outHtml) {
  if (python === 'py') {
    return ['-3', scriptPath, '--out', outHtml, ...passthroughArgs];
  }
  return [scriptPath, '--out', outHtml, ...passthroughArgs];
}

const config = loadConfig();
const backtraderRoot = path.resolve(
  portfolioRoot,
  process.env.BACKTRADER_ROOT || config.backtraderRoot,
);
const outHtml = path.resolve(portfolioRoot, config.outHtml);
const buildScript = path.join(backtraderRoot, 'build_double_dragon_dashboard.py');
const passthroughArgs = process.argv.slice(2);

if (!fs.existsSync(buildScript)) {
  console.error(`Backtrader 构建脚本不存在: ${buildScript}`);
  console.error('可在 scripts/long-dashboard.config.json 或 BACKTRADER_ROOT 中修改路径');
  process.exit(1);
}

const python = resolvePython();
const args = pythonArgs(python, buildScript, passthroughArgs, outHtml);
const result = spawnSync(python, args, {
  cwd: backtraderRoot,
  encoding: 'utf8',
  stdio: 'inherit',
});

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

if (!fs.existsSync(outHtml)) {
  console.error(`同步失败，未生成: ${outHtml}`);
  process.exit(1);
}

const sizeKb = (fs.statSync(outHtml).size / 1024).toFixed(1);
console.log(`Portfolio /long 看板已同步: ${outHtml} (${sizeKb} KB)`);
