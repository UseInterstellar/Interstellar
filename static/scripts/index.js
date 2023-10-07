window.addEventListener('load', () => {
  navigator.serviceWorker.register('../sw.js', {
    scope: '/astronomy/',
  });
});
function isUrl(val = '') {
  const urlPattern = /^(http(s)?:\/\/)?([\w-]+\.)+[\w]{2,}(\/.*)?$/;
  return urlPattern.test(val);
}
function prependHttps(url) {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return 'https://' + url;
  }
  return url;
}

const form = document.querySelector('form');
const input = document.querySelector('input');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formValue = document.querySelector('form input').value;
  const url = isUrl(formValue)
    ? prependHttps(formValue)
    : 'https://www.google.com/search?q=' + encodeURIComponent(formValue);

  sessionStorage.setItem('encodedUrl', encodeURIComponent(url));
  location.href = '/./go';
});