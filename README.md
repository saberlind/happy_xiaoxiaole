# 🍎 开心消消乐豪华版

一个现代化的H5消除类游戏，支持移动端和微信环境，具有精美的界面和丰富的游戏机制。

## 🎮 游戏特色

- **20个精心设计的关卡** - 从简单到复杂，逐步提升挑战性
- **多种游戏元素** - 水果、炸弹、彩虹球等特殊道具
- **障碍物系统** - 冰层、锁链等增加策略性
- **精美的视觉效果** - 渐变背景、粒子效果、流畅动画
- **音效系统** - 沉浸式的游戏体验
- **移动端优化** - 完美支持触摸操作和微信环境
- **响应式设计** - 适配各种屏幕尺寸

## 🚀 快速开始

### 在线体验

访问 [在线演示](https://yourusername.github.io/happy-crush-deluxe) 立即开始游戏！

### 本地运行

1. **克隆项目**
   ```bash
   git clone https://github.com/yourusername/happy-crush-deluxe.git
   cd happy-crush-deluxe
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **启动开发服务器**
   ```bash
   npm run dev
   ```
   
   然后在浏览器中访问 `http://localhost:8000`

## 📁 项目结构

```
happy-crush-deluxe/
├── index.html          # 主页面文件
├── styles.css          # 样式文件
├── game.js            # 游戏逻辑
├── package.json       # 项目配置
├── build.js           # 构建脚本
├── deploy.js          # 部署脚本
├── .github/
│   └── workflows/
│       └── deploy.yml # GitHub Actions工作流
├── dist/              # 构建输出目录
└── README.md          # 项目说明
```

## 🎯 游戏规则

### 基本玩法
1. **消除匹配** - 连接3个或更多相同的水果来消除它们
2. **交换水果** - 点击相邻的两个水果进行交换
3. **完成目标** - 每个关卡都有特定的完成条件
4. **步数限制** - 在有限的步数内完成关卡目标

### 特殊元素
- **🍎 基础水果** - 苹果、橙子、香蕉、葡萄、草莓
- **💣 炸弹** - 消除周围的水果
- **🌈 彩虹球** - 可以消除任意颜色的水果
- **❄️ 冰层** - 需要消除上面的水果来破坏
- **⛓️ 锁链** - 阻止水果移动，需要特殊方式破坏

### 关卡类型
- **得分关卡** - 达到指定分数
- **消除关卡** - 消除指定数量的特定水果
- **障碍关卡** - 破坏所有障碍物
- **限时挑战** - 在限定步数内完成目标

## 🛠️ 开发指南

### 技术栈
- **HTML5** - 结构和语义
- **CSS3** - 样式和动画
- **Vanilla JavaScript** - 游戏逻辑
- **LocalStorage** - 数据持久化
- **GitHub Pages** - 静态网站托管

### 开发命令

```bash
# 启动开发服务器
npm run dev

# 构建项目
npm run build

# 部署到GitHub Pages
npm run deploy

# 启动生产服务器
npm start
```

### 构建和部署

项目支持多种部署方式：

#### 1. 自动部署（推荐）
推送代码到GitHub后，GitHub Actions会自动构建和部署：

```bash
git add .
git commit -m "Update game"
git push origin main
```

#### 2. 手动部署
使用内置的部署脚本：

```bash
npm run deploy
```

#### 3. 本地构建
只构建不部署：

```bash
npm run build
```

## 🔧 配置说明

### GitHub Pages设置

1. 在GitHub仓库中进入 **Settings** → **Pages**
2. 选择 **Source**: "GitHub Actions"
3. 推送代码后自动部署

### 自定义配置

修改 `package.json` 中的以下字段：

```json
{
  "name": "your-game-name",
  "repository": {
    "url": "https://github.com/yourusername/your-repo.git"
  },
  "homepage": "https://yourusername.github.io/your-repo"
}
```

## 📱 移动端支持

游戏针对移动端进行了特别优化：

- **触摸操作** - 支持点击和滑动操作
- **微信兼容** - 完美支持微信内置浏览器
- **响应式布局** - 适配各种屏幕尺寸
- **性能优化** - 流畅的动画和交互

### 微信分享优化

游戏包含了微信环境的特殊优化：
- 防止下拉刷新
- 禁用双击缩放
- 优化触摸事件
- 适配微信浏览器

## 🎨 自定义主题

可以通过修改 `styles.css` 来自定义游戏外观：

```css
/* 修改主色调 */
:root {
  --primary-color: #7c3aed;
  --secondary-color: #f59e0b;
  --background-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

## 🐛 问题反馈

如果您遇到任何问题或有改进建议，请：

1. 查看 [Issues](https://github.com/yourusername/happy-crush-deluxe/issues)
2. 创建新的Issue描述问题
3. 或者直接提交Pull Request

## 📄 许可证

本项目采用 [MIT 许可证](LICENSE)。

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者和测试者！

---

**享受游戏的乐趣！** 🎮✨