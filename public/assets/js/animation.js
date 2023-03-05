window.onload = () => {
    const anchors = document.querySelectorAll('a');
  const transition_el = document.querySelector('.transition');

  setTimeout(() => {
    transition_el.classList.remove('is-active');
  }, 500);

  window.addEventListener('popstate', () => {
    transition_el.classList.add('is-active');

    setTimeout(() => {
      transition_el.classList.remove('is-active');
    }, 500);
  });
};
