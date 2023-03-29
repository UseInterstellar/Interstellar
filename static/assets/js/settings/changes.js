function redirectToMainDomain() {
  var currentUrl = window.location.href;
  var mainDomainUrl = currentUrl.replace(/\/[^\/]*$/, '');
  window.location.href = mainDomainUrl;
}
