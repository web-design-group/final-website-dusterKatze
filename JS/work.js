

(function () {
  'use strict';

  // Утилиты
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => Array.from(root.querySelectorAll(s));

  // Инициализация всех слайдеров после загрузки DOM
  document.addEventListener('DOMContentLoaded', () => {
    initStickersSlider({
      prefix: 'imgs/stik1/IMG_1677-',
      count: 12,
      ids: { left: 'left-sticker', center: 'center-sticker', right: 'right-sticker' },
      prevSel: '.prev-btn',
      nextSel: '.next-btn'
    });

    initStickersSlider({
      prefix: 'imgs/stik2/Иллюстрация_без_названия-',
      count: 13,
      ids: { left: 'left-sticker-2', center: 'center-sticker-2', right: 'right-sticker-2' },
      prevSel: '.prev-btn-2',
      nextSel: '.next-btn-2'
    });

    initBookletSlider({
      prefix: 'imgs/buk/Иллюстрация_без_названия-',
      count: 12,
      leftId: 'booklet-left-img',
      rightId: 'booklet-right-img',
      prevSel: '.booklet-prev-btn',
      nextSel: '.booklet-next-btn'
    });

    initPhotobookSlider({
      sequence: buildPhotobookSequence(),
      leftId: 'photobook-left-img',
      centerId: 'photobook-center-img',
      rightId: 'photobook-right-img',
      prevSel: '.photobook-prev-btn',
      nextSel: '.photobook-next-btn'
    });
  });

  // ---------- helpers ----------
  function buildPhotobookSequence() {
    const arr = [];
    // 1..7 .DNG
    for (let i = 1; i <= 7; i++) arr.push(`imgs/book/${i}.DNG`);
    // 8..10 .JPG
    for (let i = 8; i <= 10; i++) arr.push(`imgs/book/${i}.JPG`);
    // 11 .DNG
    arr.push(`imgs/book/11.DNG`);
    return arr;
  }

  // ---------- Stickers slider generic ----------
  function initStickersSlider({ prefix, count, ids, prevSel, nextSel }) {
    if (!ids || !ids.left) return;
    const images = [];
    for (let i = 1; i <= count; i++) {
      // сохраняем полные имена файлов; если у тебя в именах есть пробелы/скобки — оставляем как есть
      images.push(`${prefix}${i} (2).png`);
    }

    const leftEl = document.getElementById(ids.left);
    const centerEl = document.getElementById(ids.center);
    const rightEl = document.getElementById(ids.right);
    const prevBtn = document.querySelector(prevSel);
    const nextBtn = document.querySelector(nextSel);

    if (!centerEl) return; // минимальная проверка DOM

    let idx = 0;

    function update() {
      const leftIndex = (idx - 1 + images.length) % images.length;
      const centerIndex = idx;
      const rightIndex = (idx + 1) % images.length;

      if (leftEl) { leftEl.src = images[leftIndex]; leftEl.alt = `Стикер ${leftIndex + 1}`; }
      if (centerEl) { centerEl.src = images[centerIndex]; centerEl.alt = `Стикер ${centerIndex + 1}`; }
      if (rightEl) { rightEl.src = images[rightIndex]; rightEl.alt = `Стикер ${rightIndex + 1}`; }
    }

    function next() { idx = (idx + 1) % images.length; update(); }
    function prev() { idx = (idx - 1 + images.length) % images.length; update(); }

    if (prevBtn) prevBtn.addEventListener('click', prev);
    if (nextBtn) nextBtn.addEventListener('click', next);

    update();
  }

  // ---------- Booklet slider ----------
  function initBookletSlider({ prefix, count, leftId, rightId, prevSel, nextSel }) {
    const imgs = [];
    for (let i = 1; i <= count; i++) imgs.push(`${prefix}${i} (3).png`);

    const leftEl = document.getElementById(leftId);
    const rightEl = document.getElementById(rightId);
    const prevBtn = document.querySelector(prevSel);
    const nextBtn = document.querySelector(nextSel);

    if (!leftEl || !rightEl) return;

    let pair = 0;
    const totalPairs = Math.ceil(imgs.length / 2);

    function update() {
      const leftIndex = (pair * 2) % imgs.length;
      const rightIndex = (leftIndex + 1) % imgs.length;

      leftEl.src = imgs[leftIndex];
      rightEl.src = imgs[rightIndex];
      leftEl.alt = `Буклет страница ${leftIndex + 1}`;
      rightEl.alt = `Буклет страница ${rightIndex + 1}`;
    }

    function next() { pair = (pair + 1) % totalPairs; update(); }
    function prev() { pair = (pair - 1 + totalPairs) % totalPairs; update(); }

    if (prevBtn) prevBtn.addEventListener('click', prev);
    if (nextBtn) nextBtn.addEventListener('click', next);

    update();
  }

  // ---------- Photobook slider ----------
  function initPhotobookSlider({ sequence, leftId, centerId, rightId, prevSel, nextSel }) {
    if (!sequence || sequence.length === 0) return;

    const leftEl = document.getElementById(leftId);
    const centerEl = document.getElementById(centerId);
    const rightEl = document.getElementById(rightId);
    const prevBtn = document.querySelector(prevSel);
    const nextBtn = document.querySelector(nextSel);

    if (!centerEl) return;

    let cur = 0;

    function update() {
      const leftIndex = (cur - 1 + sequence.length) % sequence.length;
      const centerIndex = cur;
      const rightIndex = (cur + 1) % sequence.length;

      if (leftEl) { leftEl.src = sequence[leftIndex]; leftEl.alt = `Фотокнига ${leftIndex + 1}`; }
      centerEl.src = sequence[centerIndex]; centerEl.alt = `Фотокнига ${centerIndex + 1}`;
      if (rightEl) { rightEl.src = sequence[rightIndex]; rightEl.alt = `Фотокнига ${rightIndex + 1}`; }

      // active class on middle slide item (assumes three items order)
      const items = $$('.photobook-slide-item');
      items.forEach(it => it.classList.remove('active'));
      if (items[1]) items[1].classList.add('active');
    }

    function next() { cur = (cur + 1) % sequence.length; update(); }
    function prev() { cur = (cur - 1 + sequence.length) % sequence.length; update(); }

    if (prevBtn) prevBtn.addEventListener('click', prev);
    if (nextBtn) nextBtn.addEventListener('click', next);

    update();
  }

})();
