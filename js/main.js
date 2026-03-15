// 标签页切换
function switchTab(tabId) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
    document.getElementById(tabId).classList.add('active');
}

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// 滚动动画
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.card, .diagram').forEach(el => observer.observe(el));

// 代码块折叠功能
document.addEventListener('DOMContentLoaded', function() {
    // 为所有 pre 标签添加折叠头部
    document.querySelectorAll('pre').forEach(function(pre) {
        // 检查是否已有 header
        if (pre.querySelector('.code-header')) return;

        // 获取代码语言
        let lang = 'bash';
        const code = pre.querySelector('code');
        if (code) {
            const className = code.className || '';
            if (className.includes('language-python')) lang = 'python';
            else if (className.includes('language-javascript')) lang = 'javascript';
            else if (className.includes('language-typescript')) lang = 'typescript';
            else if (className.includes('language-bash') || className.includes('language-sh')) lang = 'bash';
            else if (className.includes('language-curl')) lang = 'curl';
            else if (className.includes('language-json')) lang = 'json';
            else if (className.includes('language-yaml')) lang = 'yaml';
            else if (className.includes('language-css')) lang = 'css';
            else if (className.includes('language-html')) lang = 'html';
        }

        // 判断是否需要折叠（代码行数 > 8 行）
        const lines = pre.textContent.split('\n').filter(l => l.trim()).length;
        if (lines <= 8) return;

        // 添加折叠头部
        const header = document.createElement('div');
        header.className = 'code-header';
        header.innerHTML = `
            <span class="code-title">代码片段</span>
            <span class="code-lang">${lang.toUpperCase()}</span>
            <span class="code-toggle">▼ 折叠</span>
        `;

        pre.insertBefore(header, pre.firstChild);

        // 点击折叠
        header.addEventListener('click', function() {
            const toggle = this.querySelector('.code-toggle');
            if (pre.classList.contains('collapsed')) {
                pre.classList.remove('collapsed');
                toggle.textContent = '▼ 折叠';
                toggle.classList.remove('collapsed');
            } else {
                pre.classList.add('collapsed');
                toggle.textContent = '▶ 展开';
                toggle.classList.add('collapsed');
            }
        });
    });

    // 简单的语法高亮
    document.querySelectorAll('pre code').forEach(function(block) {
        const text = block.innerHTML;
        let highlighted = text
            // 注释
            .replace(/(#.*)/g, '<span class="token comment">$1</span>')
            // 字符串
            .replace(/(["'`])(?:(?!\1)[^\\]|\\.)*\1/g, '<span class="token string">$&</span>')
            // 关键词
            .replace(/\b(def|class|import|from|return|if|else|elif|for|while|in|try|except|with|as|pass|break|continue|and|or|not|None|True|False|print|function|const|let|var|async|await|export|import|default|case|switch|break|continue|new|this|static|public|private|try|catch|throw|finally)\b/g, '<span class="token keyword">$1</span>')
            // 数字
            .replace(/\b(\d+\.?\d*)\b/g, '<span class="token number">$1</span>')
            // 函数调用
            .replace(/\b(ollama|print|console|import|from|require)\s*\(/g, '<span class="token function">$1</span>(')
            // URL
            .replace(/(https?:\/\/[^\s]+)/g, '<span class="token url">$1</span>');
        block.innerHTML = highlighted;
    });
});
