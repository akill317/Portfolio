import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectsPath = path.join(__dirname, 'src/data/projects.json');
let projects = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));

// 找到Birds Camp项目
const birdsCampIndex = projects.findIndex(project => project.id === 'birds-camp');
if (birdsCampIndex === -1) {
  console.log('未找到Birds Camp项目');
  process.exit(1);
}

// 将Birds Camp项目移到数组开头
const birdsCampProject = projects.splice(birdsCampIndex, 1)[0];
projects.unshift(birdsCampProject);

// 重新设置所有项目的order
projects.forEach((project, index) => {
  project.order = index + 1;
});

// 保存文件
fs.writeFileSync(projectsPath, JSON.stringify(projects, null, 2), 'utf8');

console.log('项目排序完成！Birds Camp已排到第一位，order为1。');
console.log(`总共${projects.length}个项目已重新排序。`);
