function redirectToMainDomain() {
  var currentUrl = window.location.href;
  var mainDomainUrl = currentUrl.replace(/\/[^\/]*$/, '');
  if (window != top) {
    top.location.href = mainDomainUrl;
  } else {
    window.location.href = mainDomainUrl;
  }
}
