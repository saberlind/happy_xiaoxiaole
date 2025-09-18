const fs = require('fs');
const path = require('path');

// 构建配置
const BUILD_DIR = 'dist';
const SOURCE_FILES = [
    'index.html',
    'styles.css',
    'game.js'
];

// 创建构建目录
function createBuildDir() {
    if (!fs.existsSync(BUILD_DIR)) {
        fs.mkdirSync(BUILD_DIR, { recursive: true });
        console.log(`✅ 创建构建目录: ${BUILD_DIR}`);
    } else {
        console.log(`📁 构建目录已存在: ${BUILD_DIR}`);
    }
}

// 复制文件
function copyFile(src, dest) {
    try {
        fs.copyFileSync(src, dest);
        console.log(`📄 复制文件: ${src} -> ${dest}`);
    } catch (error) {
        console.error(`❌ 复制文件失败: ${src}`, error.message);
    }
}

// 优化HTML文件
function optimizeHTML(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // 移除多余的空白和注释
        content = content
            .replace(/<!--[\s\S]*?-->/g, '') // 移除HTML注释
            .replace(/\s+/g, ' ') // 压缩空白
            .replace(/> </g, '><'); // 移除标签间空白
        
        const destPath = path.join(BUILD_DIR, path.basename(filePath));
        fs.writeFileSync(destPath, content);
        console.log(`🎯 优化HTML: ${filePath}`);
    } catch (error) {
        console.error(`❌ 优化HTML失败: ${filePath}`, error.message);
    }
}

// 优化CSS文件
function optimizeCSS(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // 移除注释和多余空白
        content = content
            .replace(/\/\*[\s\S]*?\*\//g, '') // 移除CSS注释
            .replace(/\s+/g, ' ') // 压缩空白
            .replace(/;\s*}/g, '}') // 移除最后一个分号
            .replace(/\s*{\s*/g, '{') // 压缩大括号
            .replace(/;\s*/g, ';') // 压缩分号
            .trim();
        
        const destPath = path.join(BUILD_DIR, path.basename(filePath));
        fs.writeFileSync(destPath, content);
        console.log(`🎨 优化CSS: ${filePath}`);
    } catch (error) {
        console.error(`❌ 优化CSS失败: ${filePath}`, error.message);
    }
}

// 优化JavaScript文件
function optimizeJS(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // 移除单行注释和多行注释
        content = content
            .replace(/\/\*[\s\S]*?\*\//g, '') // 移除多行注释
            .replace(/\/\/.*$/gm, '') // 移除单行注释
            .replace(/\s+/g, ' ') // 压缩空白
            .replace(/;\s*}/g, '}') // 优化分号
            .trim();
        
        const destPath = path.join(BUILD_DIR, path.basename(filePath));
        fs.writeFileSync(destPath, content);
        console.log(`⚡ 优化JS: ${filePath}`);
    } catch (error) {
        console.error(`❌ 优化JS失败: ${filePath}`, error.message);
    }
}

// 生成部署信息
function generateDeployInfo() {
    const deployInfo = {
        buildTime: new Date().toISOString(),
        version: require('./package.json').version,
        files: SOURCE_FILES,
        buildDir: BUILD_DIR
    };
    
    const infoPath = path.join(BUILD_DIR, 'deploy-info.json');
    fs.writeFileSync(infoPath, JSON.stringify(deployInfo, null, 2));
    console.log(`📋 生成部署信息: ${infoPath}`);
}

// 主构建函数
function build() {
    console.log('🚀 开始构建项目...');
    console.log('=' .repeat(50));
    
    // 创建构建目录
    createBuildDir();
    
    // 处理每个源文件
    SOURCE_FILES.forEach(file => {
        if (!fs.existsSync(file)) {
            console.warn(`⚠️  文件不存在: ${file}`);
            return;
        }
        
        const ext = path.extname(file).toLowerCase();
        
        switch (ext) {
            case '.html':
                optimizeHTML(file);
                break;
            case '.css':
                optimizeCSS(file);
                break;
            case '.js':
                optimizeJS(file);
                break;
            default:
                copyFile(file, path.join(BUILD_DIR, path.basename(file)));
        }
    });
    
    // 生成部署信息
    generateDeployInfo();
    
    console.log('=' .repeat(50));
    console.log('✅ 构建完成！');
    console.log(`📦 构建文件位于: ${BUILD_DIR}/`);
    
    // 显示文件大小信息
    console.log('\n📊 文件大小信息:');
    SOURCE_FILES.forEach(file => {
        const buildFile = path.join(BUILD_DIR, path.basename(file));
        if (fs.existsSync(buildFile)) {
            const stats = fs.statSync(buildFile);
            const sizeKB = (stats.size / 1024).toFixed(2);
            console.log(`   ${path.basename(file)}: ${sizeKB} KB`);
        }
    });
}

// 如果直接运行此脚本
if (require.main === module) {
    build();
}

module.exports = { build };