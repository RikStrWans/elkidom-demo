const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');
burger.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
nav.addEventListener('click', e => {
  if (e.target.tagName === 'A') {
    nav.classList.remove('open');
    burger.setAttribute('aria-expanded', false);
  }
});

// Досуг: вкладки «Летом / Зимой»
document.querySelectorAll('.tabs button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tabs button').forEach(b => b.setAttribute('aria-selected', b === btn));
    document.querySelectorAll('.tab-panel').forEach(p => { p.hidden = p.id !== btn.dataset.tab; });
  });
});

// Галерея: фото на весь экран
const lb = document.getElementById('lightbox');
const lbImg = lb.querySelector('img');
document.querySelectorAll('.g-item').forEach(btn => {
  btn.addEventListener('click', () => {
    lbImg.src = btn.dataset.src;
    lbImg.alt = btn.querySelector('img').alt;
    lb.hidden = false;
  });
});
const closeLb = () => { lb.hidden = true; lbImg.src = ''; };
lb.addEventListener('click', e => { if (e.target !== lbImg) closeLb(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !lb.hidden) closeLb(); });

const form = document.getElementById('bookForm');
const note = document.getElementById('formNote');
const today = new Date().toISOString().slice(0, 10);
form.from.min = today;
form.to.min = today;
form.from.addEventListener('change', () => { form.to.min = form.from.value || today; });
form.addEventListener('submit', e => {
  e.preventDefault();
  if (form.to.value && form.to.value < form.from.value) {
    note.textContent = 'Дата выезда раньше даты заезда.';
    return;
  }
  // Демо: в рабочей версии здесь POST на webhook n8n -> Telegram администратору
  note.textContent = 'Это демо-версия: заявка никуда не отправлена. Для брони напишите в WhatsApp: +7 962 162-75-55.';
  form.reset();
  form.guests.value = 2;
});
