(() => {
  'use strict';

  const viewer = document.getElementById('viewer');
  // The links still open complete posts in browsers without dialog support.
  if (!viewer || typeof viewer.showModal !== 'function') return;

  const image = document.getElementById('viewer-image');
  const caption = document.getElementById('viewer-text');
  const date = document.getElementById('viewer-date');
  const count = document.getElementById('viewer-count');
  const error = document.getElementById('viewer-error');
  const previous = document.getElementById('prev');
  const next = document.getElementById('next');
  const close = document.getElementById('close-viewer');
  const imageArea = image.parentElement;
  const posts = new Map(
    [...document.querySelectorAll('template[data-post]')]
      .map(template => [template.dataset.post, template])
  );

  let images = [];
  let index = 0;
  let opener = null;
  let lockedScroll = false;
  let touchStart = null;

  function render() {
    const current = images[index];
    error.hidden = true;
    image.hidden = false;
    image.alt = current.alt || 'Image';
    image.src = current.src;
    count.textContent = `${index + 1} / ${images.length}`;
    count.hidden = images.length < 2;
    previous.hidden = next.hidden = images.length < 2;
    previous.disabled = index === 0;
    next.disabled = index === images.length - 1;
  }

  function move(direction) {
    const target = index + direction;
    if (target < 0 || target >= images.length) return;
    index = target;
    render();
  }

  function open(tile, template) {
    images = [...template.content.querySelectorAll('img')]
      .map(item => ({ src: item.getAttribute('src'), alt: item.alt }))
      .filter(item => item.src);
    if (!images.length) return false;

    opener = tile;
    index = 0;
    caption.textContent = template.dataset.text || '';
    caption.hidden = !caption.textContent;
    date.textContent = template.dataset.date || '';
    date.hidden = !date.textContent;
    if (template.dataset.datetime) date.dateTime = template.dataset.datetime;
    else date.removeAttribute('datetime');
    render();
    viewer.showModal();
    lockedScroll = !document.body.classList.contains('modal-open');
    document.body.classList.add('modal-open');
    close.focus({ preventScroll: true });
    return true;
  }

  document.querySelectorAll('a.tile[data-post]').forEach(tile => {
    tile.addEventListener('click', event => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey ||
          event.ctrlKey || event.shiftKey || event.altKey) return;
      const template = posts.get(tile.dataset.post);
      if (template && open(tile, template)) event.preventDefault();
    });
  });

  close.addEventListener('click', () => viewer.close());
  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));

  document.addEventListener('keydown', event => {
    if (!viewer.open || event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      move(event.key === 'ArrowLeft' ? -1 : 1);
    }
  });

  // Native dialog handles focus containment and Escape. Restore the grid on close.
  viewer.addEventListener('close', () => {
    if (viewer.open) return;
    if (lockedScroll) document.body.classList.remove('modal-open');
    image.removeAttribute('src');
    image.alt = '';
    touchStart = null;
    if (opener?.isConnected) opener.focus({ preventScroll: true });
  });

  image.addEventListener('error', () => {
    if (!viewer.open || !image.getAttribute('src')) return;
    image.hidden = true;
    error.hidden = false;
  });

  // Horizontal touch gestures change images; vertical scrolling remains available.
  imageArea.addEventListener('pointerdown', event => {
    if (event.pointerType !== 'touch' || !event.isPrimary) return;
    touchStart = { id: event.pointerId, x: event.clientX, y: event.clientY };
  });
  imageArea.addEventListener('pointerup', event => {
    if (!touchStart || event.pointerId !== touchStart.id) return;
    const dx = event.clientX - touchStart.x;
    const dy = event.clientY - touchStart.y;
    touchStart = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      move(dx < 0 ? 1 : -1);
    }
  });
  imageArea.addEventListener('pointercancel', () => { touchStart = null; });
})();
