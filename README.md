# Xminstrel Homepage

这是 `homepage` 仓库里的个人主页项目，使用 **Vite + React + Tailwind CSS** 构建，并通过 **GitHub Actions + GitHub Pages** 自动部署。

当前站点风格参考了 `mem.ac` / `memset0.github.io` 一类学术个人主页：左侧身份栏、右侧内容流、淡绿色主题、轻量卡片和细分隔线。

## 技术栈

- Vite
- React
- Tailwind CSS
- npm
- GitHub Pages
- GitHub Actions

## 项目结构

```text
homepage/
├─ .github/workflows/deploy.yml   # GitHub Pages 自动部署 workflow
├─ assets/images/avatar.png       # 当前头像图片
├─ src/
│  ├─ App.jsx                     # 页面结构和主要内容
│  ├─ index.css                   # 全局样式、主题色、响应式布局
│  └─ main.jsx                    # React 入口
├─ index.html                     # Vite HTML 入口
├─ vite.config.js                 # Vite 配置，包含 GitHub Pages base
├─ package.json                   # npm scripts 和依赖
└─ README.md                      # 项目维护说明
```

## 本地运行

第一次安装依赖：

```bash
npm install
```

启动开发服务器：

```bash
npm run dev
```

当前仓库名是 `homepage`，Vite 的 `base` 是 `/homepage/`，所以本地通常访问：

```text
http://127.0.0.1:5173/homepage/
```

## 构建检查

生产构建：

```bash
npm run build
```

预览生产构建：

```bash
npm run preview
```

提交前建议至少跑一次：

```bash
npm run build
```

## 如何修改页面内容

主要内容都在 `src/App.jsx` 顶部的几个常量里，优先改那里。

### 修改链接

编辑 `links`：

```jsx
const links = {
  github: 'https://github.com/xminstrel',
  notes: 'https://note.xminstrel.top',
  email: 'mailto:xminstrelpro@gmail.com',
}
```

### 修改导航

编辑 `navItems`。注意：`id` 需要和下面的 `<Section id="...">` 保持一致。

```jsx
const navItems = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
]
```

### 修改项目列表

编辑 `projects`。可以增删对象或调整顺序，页面编号会自动生成。

```jsx
const projects = [
  {
    label: 'Tool',
    title: 'ZJU Classroom Transcript Tool',
    description: '...',
    tags: ['AI prompt', 'Transcript', 'Study tool'],
  },
]
```

### 修改技能标签

编辑 `stack`：

```jsx
const stack = ['React', 'Tailwind CSS', 'ROS2']
```

### 修改 About 文案

在 `App.jsx` 里搜索：

```jsx
<Section id="about" title="About">
```

直接修改其中的 `<p>` 内容。如果需要更长的简介，可以继续添加新的 `<p>`。

### 修改头像

替换这个文件即可：

```text
assets/images/avatar.png
```

如果你改了文件名，需要同步修改 `src/App.jsx` 顶部：

```jsx
import avatarUrl from '../assets/images/avatar.png'
```

## 如何修改视觉风格

主题色主要在 `src/index.css` 的 `:root` 变量里。

浅色模式：

```css
:root {
  --bg: #ffffff;
  --bg-tint: #edf8f0;
  --accent: #4f9a67;
  --accent-ink: #245d39;
  --accent-soft: #e4f4e9;
}
```

深色模式：

```css
:root[data-theme='dark'] {
  --bg: #14101f;
  --bg-elev: #17251d;
  --accent: #91d6a8;
}
```

如果只想换主题色，优先改这些 CSS 变量，不要先改每个组件的 class。

## GitHub Pages 部署

部署配置在：

```text
.github/workflows/deploy.yml
```

推送到 `main` 分支后，GitHub Actions 会自动：

1. `actions/checkout`
2. `actions/setup-node`
3. `npm ci`
4. `npm run build`
5. `actions/upload-pages-artifact`
6. `actions/deploy-pages`

GitHub 仓库设置里需要进入：

```text
Settings -> Pages -> Build and deployment -> Source
```

选择：

```text
GitHub Actions
```

## GitHub Pages base 配置

当前是项目站点：

```text
https://<username>.github.io/homepage/
```

所以 `vite.config.js` 里设置为：

```js
base: '/homepage/',
```

如果以后绑定自定义域名 `xminstrel.top`，需要改成：

```js
base: '/',
```

同时在 GitHub Pages 设置 Custom domain，并在 DNS / Cloudflare 中配置域名解析。

如果希望 GitHub Pages 每次部署都保留自定义域名，可以添加：

```text
public/CNAME
```

内容为：

```text
xminstrel.top
```

## 常用命令

```bash
npm install
npm run dev
npm run build
npm run preview
```

部署前检查：

```bash
git status
npm run build
git add .
git commit -m "Update homepage"
git push origin main
```
