# 🚀 部署指南

本文档详细说明如何将开心消消乐游戏部署到GitHub Pages，实现在线访问。

## 📋 部署前准备

### 1. GitHub仓库设置

确保您已经：
- 创建了GitHub账户
- 创建了新的仓库（建议命名为 `happy-crush-deluxe`）
- 将代码推送到仓库

### 2. 本地环境要求

- Node.js 16+ 
- Git
- 网络连接

## 🎯 部署方式

### 方式一：自动部署（推荐）

使用GitHub Actions实现自动化部署，每次推送代码都会自动更新网站。

#### 步骤1：启用GitHub Pages

1. 进入GitHub仓库页面
2. 点击 **Settings** 选项卡
3. 在左侧菜单中找到 **Pages**
4. 在 **Source** 部分选择 "**GitHub Actions**"
5. 保存设置

#### 步骤2：推送代码触发部署

```bash
# 添加所有文件
git add .

# 提交更改
git commit -m "Initial deployment"

# 推送到GitHub
git push origin main
```

#### 步骤3：查看部署状态

1. 在仓库页面点击 **Actions** 选项卡
2. 查看工作流运行状态
3. 部署成功后，网站将在 `https://yourusername.github.io/repository-name` 可访问

### 方式二：手动部署

使用内置的部署脚本进行一键部署。

```bash
# 安装依赖
npm install

# 执行部署脚本
npm run deploy
```

部署脚本会自动：
- 构建项目
- 创建gh-pages分支
- 推送构建文件
- 配置GitHub Pages

### 方式三：手动构建部署

如果需要更多控制，可以手动执行每个步骤：

```bash
# 1. 构建项目
npm run build

# 2. 进入构建目录
cd dist

# 3. 初始化Git仓库
git init
git add .
git commit -m "Deploy to GitHub Pages"

# 4. 推送到gh-pages分支
git remote add origin https://github.com/yourusername/repository-name.git
git push -f origin main:gh-pages
```

## ⚙️ 配置说明

### package.json配置

确保 `package.json` 中的配置正确：

```json
{
  "name": "happy-crush-deluxe",
  "homepage": "https://yourusername.github.io/repository-name",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/repository-name.git"
  }
}
```

### GitHub Actions配置

`.github/workflows/deploy.yml` 文件配置了自动部署流程：

- **触发条件**：推送到main/master分支
- **构建环境**：Ubuntu + Node.js 18
- **部署目标**：GitHub Pages
- **构建产物**：dist目录

## 🔍 部署验证

### 检查部署状态

1. **GitHub Actions**
   - 进入仓库的Actions页面
   - 查看最新的工作流运行
   - 确认所有步骤都成功完成

2. **GitHub Pages设置**
   - 进入Settings → Pages
   - 确认Source设置为"GitHub Actions"
   - 查看部署状态和URL

3. **网站访问**
   - 访问 `https://yourusername.github.io/repository-name`
   - 确认游戏正常加载和运行
   - 测试各项功能

### 常见问题排查

#### 1. 404错误

**原因**：路径配置错误或文件未正确部署

**解决方案**：
```bash
# 检查构建产物
ls -la dist/

# 确认index.html存在
cat dist/index.html

# 重新部署
npm run deploy
```

#### 2. 样式或脚本加载失败

**原因**：相对路径问题

**解决方案**：
- 确保所有资源使用相对路径
- 检查 `index.html` 中的引用路径
- 验证构建后的文件结构

#### 3. GitHub Actions失败

**原因**：权限或配置问题

**解决方案**：
1. 检查仓库的Actions权限设置
2. 确认工作流文件语法正确
3. 查看详细的错误日志

## 📊 性能优化

### 构建优化

`build.js` 脚本包含以下优化：

- **HTML压缩**：移除空白和注释
- **CSS优化**：压缩样式文件
- **JavaScript压缩**：减小文件体积
- **资源内联**：减少HTTP请求

### 缓存策略

```html
<!-- 在index.html中添加缓存控制 -->
<meta http-equiv="Cache-Control" content="max-age=31536000">
```

## 🔒 安全考虑

### 敏感信息保护

- 不要在代码中包含API密钥
- 使用GitHub Secrets存储敏感配置
- 定期更新依赖包

### HTTPS强制

GitHub Pages默认支持HTTPS，确保：
- 所有外部资源使用HTTPS
- 配置HSTS头部
- 避免混合内容警告

## 📈 监控和分析

### 添加Google Analytics

```html
<!-- 在index.html的<head>中添加 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

### 性能监控

使用浏览器开发者工具监控：
- 页面加载时间
- 资源大小
- JavaScript性能
- 移动端体验

## 🔄 更新和维护

### 定期更新

```bash
# 更新依赖
npm update

# 检查安全漏洞
npm audit

# 修复安全问题
npm audit fix
```

### 版本管理

使用语义化版本控制：

```bash
# 发布新版本
npm version patch  # 修复bug
npm version minor  # 新功能
npm version major  # 重大更改

# 推送标签
git push --tags
```

## 📞 技术支持

如果在部署过程中遇到问题：

1. 查看GitHub Actions的详细日志
2. 检查浏览器控制台的错误信息
3. 参考GitHub Pages官方文档
4. 在项目Issues中寻求帮助

---

**祝您部署顺利！** 🎉