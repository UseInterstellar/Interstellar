window.addEventListener('load', () => {
  navigator.serviceWorker.register('../sw.js', {
    scope: '/reviews/',
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
    : 'https://www.google.com/search?q=' + formValue;

  const activeIframe = Array.from(
    document.getElementById('iframe-container').querySelectorAll('iframe')
  ).find((iframe) => iframe.classList.contains('active'));

  activeIframe.src = "/reviews/" + ("encodedUrl", __uv$config.encodeUrl(url));
  activeIframe.dataset.tabUrl = url;
  document.querySelector('form input').value = url;
  console.log(activeIframe.dataset.tabUrl);
});