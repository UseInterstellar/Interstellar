// Settings Management

function setTheme(theme) {
    const body = document.body;
    const buttons = document.querySelectorAll('.theme-btn');
    
    buttons.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.theme-btn[data-theme="${theme}"]`).classList.add('active');
    
    if (theme === 'light') {
        body.classList.add('light-mode');
        body.classList.remove('dark-mode');
    } else {
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
    }
    
    localStorage.setItem('theme', theme);
}

function changePrimaryColor(color) {
    document.documentElement.style.setProperty('--primary', color);
    localStorage.setItem('primaryColor', color);
}

function saveSetting(key, value) {
    const settings = JSON.parse(localStorage.getItem('settings') || '{}');
    settings[key] = value;
    localStorage.setItem('settings', JSON.stringify(settings));
}

function saveAllSettings() {
    const settings = {
        tabCloaking: document.getElementById('tabCloaking').checked,
        blankCloaking: document.getElementById('blankCloaking').checked,
        autoRefresh: document.getElementById('autoRefresh').checked,
        clearOnExit: document.getElementById('clearOnExit').checked,
        userAgent: document.getElementById('userAgent').value,
        timeout: document.getElementById('timeout').value,
        connections: document.getElementById('connections').value
    };
    
    localStorage.setItem('settings', JSON.stringify(settings));
    
    // Show success notification
    showNotification('✅ Settings saved successfully!', 'success');
}

function resetSettings() {
    if (confirm('Are you sure you want to reset all settings to defaults?')) {
        localStorage.removeItem('settings');
        location.reload();
    }
}

function clearHistory() {
    if (confirm('Clear all browsing history?')) {
        localStorage.removeItem('history');
        showNotification('✅ History cleared!', 'success');
    }
}

function clearCache() {
    if (confirm('Clear all cached data?')) {
        if ('caches' in window) {
            caches.keys().then(names => {
                names.forEach(name => caches.delete(name));
            });
        }
        showNotification('✅ Cache cleared!', 'success');
    }
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#2ecc71' : '#e74c3c'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Load settings on page load
window.addEventListener('load', () => {
    const theme = localStorage.getItem('theme') || 'dark';
    setTheme(theme);
    
    const primaryColor = localStorage.getItem('primaryColor');
    if (primaryColor) {
        document.getElementById('primaryColor').value = primaryColor;
        document.documentElement.style.setProperty('--primary', primaryColor);
    }
    
    const settings = JSON.parse(localStorage.getItem('settings') || '{}');
    document.getElementById('tabCloaking').checked = settings.tabCloaking || false;
    document.getElementById('blankCloaking').checked = settings.blankCloaking !== false;
    document.getElementById('autoRefresh').checked = settings.autoRefresh !== false;
    document.getElementById('clearOnExit').checked = settings.clearOnExit || false;
    document.getElementById('userAgent').value = settings.userAgent || 'default';
    document.getElementById('timeout').value = settings.timeout || '30';
    document.getElementById('connections').value = settings.connections || '10';
});
