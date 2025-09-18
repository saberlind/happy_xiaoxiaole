const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { build } = require('./build');

// 部署配置
const config = {
    buildDir: 'dist',
    branch: 'gh-pages',
    remote: 'origin',
    commitMessage: `Deploy: ${new Date().toISOString()}`
};

// 执行命令并输出结果
function execCommand(command, options = {}) {
    try {
        console.log(`🔧 执行命令: ${command}`);
        const result = execSync(command, { 
            encoding: 'utf8', 
            stdio: 'inherit',
            ...options 
        });
        return result;
    } catch (error) {
        console.error(`❌ 命令执行失败: ${command}`);
        console.error(error.message);
        process.exit(1);
    }
}

// 检查Git状态
function checkGitStatus() {
    console.log('📋 检查Git状态...');
    
    try {
        // 检查是否在Git仓库中
        execCommand('git rev-parse --git-dir', { stdio: 'pipe' });
        console.log('✅ Git仓库检查通过');
    } catch (error) {
        console.error('❌ 当前目录不是Git仓库，请先初始化Git仓库:');
        console.error('   git init');
        console.error('   git remote add origin <your-repo-url>');
        process.exit(1);
    }
    
    // 检查是否有未提交的更改
    try {
        const status = execSync('git status --porcelain', { encoding: 'utf8', stdio: 'pipe' });
        if (status.trim()) {
            console.warn('⚠️  检测到未提交的更改:');
            console.log(status);
            console.log('建议先提交更改后再部署');
        } else {
            console.log('✅ 工作目录干净');
        }
    } catch (error) {
        console.warn('⚠️  无法检查Git状态');
    }
}

// 检查远程仓库
function checkRemote() {
    console.log('🌐 检查远程仓库...');
    
    try {
        const remotes = execSync('git remote -v', { encoding: 'utf8', stdio: 'pipe' });
        if (!remotes.includes('origin')) {
            console.error('❌ 未找到origin远程仓库，请添加:');
            console.error('   git remote add origin <your-repo-url>');
            process.exit(1);
        }
        console.log('✅ 远程仓库检查通过');
        console.log(remotes.trim());
    } catch (error) {
        console.error('❌ 无法检查远程仓库');
        process.exit(1);
    }
}

// 构建项目
function buildProject() {
    console.log('🏗️  构建项目...');
    build();
    
    if (!fs.existsSync(config.buildDir)) {
        console.error(`❌ 构建目录不存在: ${config.buildDir}`);
        process.exit(1);
    }
    
    console.log('✅ 项目构建完成');
}

// 部署到GitHub Pages
function deployToGitHubPages() {
    console.log('🚀 部署到GitHub Pages...');
    
    // 进入构建目录
    const originalDir = process.cwd();
    process.chdir(config.buildDir);
    
    try {
        // 初始化Git仓库（如果不存在）
        if (!fs.existsSync('.git')) {
            execCommand('git init');
            execCommand(`git remote add origin ${getRemoteUrl()}`);
        }
        
        // 添加所有文件
        execCommand('git add .');
        
        // 检查是否有更改
        try {
            const status = execSync('git status --porcelain', { encoding: 'utf8', stdio: 'pipe' });
            if (!status.trim()) {
                console.log('📝 没有新的更改需要部署');
                return;
            }
        } catch (error) {
            // 忽略错误，继续部署
        }
        
        // 提交更改
        execCommand(`git commit -m "${config.commitMessage}"`);
        
        // 推送到gh-pages分支
        execCommand(`git push -f origin HEAD:${config.branch}`);
        
        console.log('✅ 部署成功！');
        
    } catch (error) {
        console.error('❌ 部署失败:', error.message);
        process.exit(1);
    } finally {
        // 返回原目录
        process.chdir(originalDir);
    }
}

// 获取远程仓库URL
function getRemoteUrl() {
    try {
        const url = execSync('git remote get-url origin', { encoding: 'utf8', stdio: 'pipe' }).trim();
        return url;
    } catch (error) {
        console.error('❌ 无法获取远程仓库URL');
        process.exit(1);
    }
}

// 显示部署信息
function showDeployInfo() {
    const packageJson = require('./package.json');
    const repoUrl = packageJson.repository?.url || 'https://github.com/yourusername/happy-crush-deluxe.git';
    const homepage = packageJson.homepage || 'https://yourusername.github.io/happy-crush-deluxe';
    
    console.log('\n' + '='.repeat(60));
    console.log('🎉 部署完成！');
    console.log('='.repeat(60));
    console.log(`📦 项目名称: ${packageJson.name}`);
    console.log(`🔖 版本: ${packageJson.version}`);
    console.log(`📂 仓库地址: ${repoUrl}`);
    console.log(`🌐 在线访问: ${homepage}`);
    console.log('\n⏰ 注意: GitHub Pages可能需要几分钟时间来更新网站');
    console.log('💡 如果是首次部署，请确保在GitHub仓库设置中启用GitHub Pages');
    console.log('='.repeat(60));
}

// 主部署函数
function deploy() {
    console.log('🚀 开始自动部署流程...');
    console.log('='.repeat(50));
    
    try {
        // 检查环境
        checkGitStatus();
        checkRemote();
        
        // 构建项目
        buildProject();
        
        // 部署到GitHub Pages
        deployToGitHubPages();
        
        // 显示部署信息
        showDeployInfo();
        
    } catch (error) {
        console.error('❌ 部署过程中发生错误:', error.message);
        process.exit(1);
    }
}

// 如果直接运行此脚本
if (require.main === module) {
    deploy();
}

module.exports = { deploy };