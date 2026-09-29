// Initialize particles background
function createStars() {
    const starsContainer = document.querySelector('.stars');
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.width = Math.random() * 2 + 1 + 'px';
        star.style.height = star.style.width;
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        starsContainer.appendChild(star);
    }
}

function navigateToUrl() {
    const input = document.getElementById('urlInput');
    const url = input.value.trim();
    
    if (!url) return;
    
    let targetUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        targetUrl = 'https://' + url;
    }
    
    addToHistory(url);
    window.location.href = '/a/q/' + btoa(targetUrl);
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        navigateToUrl();
    }
}

function toggleTheme() {
    const body = document.body;
    body.classList.toggle('light-mode');
    body.classList.toggle('dark-mode');
    localStorage.setItem('theme', body.classList.contains('light-mode') ? 'light' : 'dark');
}

// Load theme from localStorage
function loadTheme() {
    const theme = localStorage.getItem('theme') || 'dark';
    if (theme === 'light') {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
    }
}

function addToHistory(url) {
    let history = JSON.parse(localStorage.getItem('history') || '[]');
    const entry = { url, timestamp: new Date().toLocaleString() };
    history.unshift(entry);
    history = history.slice(0, 10);
    localStorage.setItem('history', JSON.stringify(history));
    updateRecentList();
}

function updateRecentList() {
    const history = JSON.parse(localStorage.getItem('history') || '[]');
    const recentList = document.getElementById('recentList');
    
    if (history.length === 0) {
        recentList.innerHTML = '<p class="empty-message">No recent visits yet</p>';
        return;
    }
    
    recentList.innerHTML = history.map(entry => `
        <div class="recent-item" onclick="navigateToUrl('${entry.url}')">
            <div class="recent-item-title">🔗 ${entry.url.substring(0, 30)}...</div>
            <div class="recent-item-time">⏱️ ${entry.timestamp}</div>
        </div>
    `).join('');
}

// Search suggestions
const suggestions = [
    'google.com',
    'youtube.com',
    'github.com',
    'wikipedia.org',
    'reddit.com',
    'stackoverflow.com'
];

document.getElementById('urlInput').addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase();
    const suggestionsDiv = document.getElementById('suggestions');
    
    if (value.length < 2) {
        suggestionsDiv.classList.remove('active');
        return;
    }
    
    const filtered = suggestions.filter(s => s.includes(value));
    
    if (filtered.length === 0) {
        suggestionsDiv.classList.remove('active');
        return;
    }
    
    suggestionsDiv.innerHTML = filtered.map(s => `
        <div class="suggestion-item" onclick="document.getElementById('urlInput').value = '${s}'; navigateToUrl()">
            🔍 ${s}
        </div>
    `).join('');
    suggestionsDiv.classList.add('active');
});

// Initialize on load
window.addEventListener('load', () => {
    createStars();
    loadTheme();
    updateRecentList();
});
