// ===== Navigation scroll shadow =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// ===== Mobile nav toggle =====
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Close mobile nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ===== Menu filter tabs =====
const tabBtns = document.querySelectorAll('.tab-btn');
const menuCards = document.querySelectorAll('.menu-card');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');

    const filter = btn.dataset.filter;
    menuCards.forEach(card => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.style.display = show ? '' : 'none';
    });
  });
});

// ===== Highlight today's hours row =====
(function highlightToday() {
  const day = new Date().getDay(); // 0 = Sun, 6 = Sat
  const rows = document.querySelectorAll('.hours-table tr');
  rows.forEach(r => r.classList.remove('today-row'));

  if (day === 0) {
    // Sunday – last row (index 2)
    if (rows[2]) rows[2].classList.add('today-row');
  } else if (day === 6) {
    // Saturday – second row (index 1)
    if (rows[1]) rows[1].classList.add('today-row');
  } else {
    // Mon–Fri – first row (index 0)
    if (rows[0]) rows[0].classList.add('today-row');
  }
})();

// ===== Set date input minimum to today =====
const dateInput = document.getElementById('date');
if (dateInput) {
  const today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);
  dateInput.value = today;
}

// ===== Reservation form =====
const form = document.getElementById('reservation-form');
const notification = document.getElementById('notification');
const notificationText = document.getElementById('notification-text');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const firstName = document.getElementById('first-name').value.trim();
  notificationText.textContent = `Thanks, ${firstName}! Your table is reserved. We'll email you shortly. ☕`;

  notification.classList.add('show');
  setTimeout(() => notification.classList.remove('show'), 5000);

  form.reset();
  dateInput.value = new Date().toISOString().split('T')[0];
});
