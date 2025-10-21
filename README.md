# 像素风个人作品展示网站

一个具有像素艺术风格的响应式个人作品展示网站，支持多种作品类型展示和国际化。

## 功能特性

- 🎮 **像素风格设计** - 复古8位游戏风格界面
- 📱 **响应式布局** - 自适应各种屏幕尺寸
- 🌍 **国际化支持** - 中英文切换
- 🎨 **作品分类** - 游戏、音乐、绘画、转笔等分类
- 🖼️ **自动裁切** - 缩略图自动裁切适配
- 🎬 **模态展示** - 点击展开详情，支持Vimeo视频嵌入
- 🖼️ **图片轮播** - 可切换的截图展示
- ✨ **流畅动画** - 使用Framer Motion实现丰富的交互动画

## 技术栈

- **React 18** - 现代化前端框架
- **Vite** - 快速构建工具
- **Framer Motion** - 专业动画库
- **CSS Modules** - 模块化样式
- **像素字体** - Press Start 2P & Silkscreen

## 项目结构

```
src/
├── components/          # React组件
│   ├── Header.jsx      # 头部导航和分类筛选
│   ├── ProjectCard.jsx # 作品卡片
│   ├── ProjectGrid.jsx # 作品网格布局
│   ├── ProjectModal.jsx # 作品详情模态框
│   └── ImageCarousel.jsx # 图片轮播组件
├── contexts/           # React上下文
│   └── LanguageContext.jsx # 语言切换上下文
├── data/              # 数据文件
│   └── projects.json  # 作品数据
├── locales/           # 国际化文件
│   ├── zh-CN.json     # 中文语言包
│   └── en-US.json     # 英文语言包
├── styles/            # 样式文件
│   ├── global.css     # 全局样式
│   └── variables.css  # CSS变量
├── App.jsx            # 主应用组件
└── main.jsx           # 应用入口
```

## 快速开始

1. **安装依赖**
   ```bash
   npm install
   ```

2. **启动开发服务器**
   ```bash
   npm run dev
   ```

3. **构建生产版本**
   ```bash
   npm run build
   ```

## 作品数据格式

在 `src/data/projects.json` 中添加你的作品数据：

```json
{
  "id": "project-001",
  "title": "作品名称",
  "category": "game|music|art|penspinning",
  "thumbnail": "path/to/thumbnail.jpg",
  "description": "作品介绍文字",
  "vimeoEmbed": "https://player.vimeo.com/video/xxxxx",
  "screenshots": ["img1.jpg", "img2.jpg", "img3.jpg"]
}
```

## 自定义样式

- 修改 `src/styles/variables.css` 中的CSS变量来调整颜色和字体
- 在 `src/styles/global.css` 中添加全局样式
- 各组件都有对应的CSS文件可以自定义样式

## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 许可证

MIT License
