// Mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

function closeMobile() {
  mobileMenu.classList.remove('open');
}

// Countdown timer — resets every 24 hours
function updateCountdown() {
  const now = new Date();
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0);
  let diff = Math.floor((midnight - now) / 1000);

  const h = Math.floor(diff / 3600);
  diff %= 3600;
  const m = Math.floor(diff / 60);
  const s = diff % 60;

  document.getElementById('cd-h').textContent = String(h).padStart(2, '0');
  document.getElementById('cd-m').textContent = String(m).padStart(2, '0');
  document.getElementById('cd-s').textContent = String(s).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

// WhatsApp popup — show after 5s, close on X
setTimeout(() => {
  const popup = document.getElementById('waPopup');
  if (popup) popup.classList.add('show');
}, 5000);

function closeWaPopup() {
  const popup = document.getElementById('waPopup');
  if (popup) popup.classList.remove('show');
}

// Size guide modal
function openSizeGuide() {
  document.getElementById('sizeModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeSizeGuide(e) {
  if (!e || e.target === document.getElementById('sizeModal') || e.currentTarget.classList.contains('modal-close')) {
    document.getElementById('sizeModal').classList.remove('open');
    document.body.style.overflow = '';
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeSizeGuide();
});

// FAQ accordion
function toggleFaq(btn) {
  const item = btn.parentElement;
  const answer = item.querySelector('.faq-a');
  const isOpen = item.classList.contains('open');

  // Close all
  document.querySelectorAll('.faq-item.open').forEach(i => {
    i.classList.remove('open');
    i.querySelector('.faq-a').style.maxHeight = null;
  });

  // Open clicked if it was closed
  if (!isOpen) {
    item.classList.add('open');
    answer.style.maxHeight = answer.scrollHeight + 'px';
  }
}

// Filter cards
function filterCards(brand, btn) {
  const cards = document.querySelectorAll('.card');
  const btns = document.querySelectorAll('.filter-btn');
  const banner = document.getElementById('luxuryBanner');

  btns.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  banner.style.display = brand === 'luxury' ? 'block' : 'none';

  cards.forEach(card => {
    if (brand === 'all' || card.dataset.brand === brand) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
}

// Smooth nav highlight on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) current = section.id;
  });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}` ? '#fff' : '';
  });
});

// Fade-in on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .step, .testimonial, .brand-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
