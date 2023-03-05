window.addEventListener('load', () => {
  const anchors = document.querySelectorAll('a');
  const transition_el = document.querySelector('.transition');

  transition_el.classList.remove('is-active');

  for (let i = 0; i < anchors.length; i++) {
    const anchor = anchors[i];

    anchor.addEventListener('click', e => {
      e.preventDefault();
      let target = e.target.href;

      transition_el.classList.add('is-active');

      setTimeout(() => {
        window.location.href = target;
      }, 500);
    })
  }
});
