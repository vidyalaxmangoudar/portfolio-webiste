// ===========================
// VIDYA LAXMANGOUDAR — PORTFOLIO
// ===========================

// --- Navbar scroll effect ---
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
    backToTop.classList.add('show');
  } else {
    navbar.classList.remove('scrolled');
    backToTop.classList.remove('show');
  }
});

// --- Mobile hamburger menu ---
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// --- Typing animation ---
const roles = [
  'Information Science Engineer',
  'Networking Enthusiast',
  'Python Developer',
  'ML Explorer',
  'Problem Solver'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById('typing');

function type() {
  if (!typingEl) return;
  const current = roles[roleIndex];
  if (isDeleting) {
    typingEl.textContent = current.substring(0, charIndex--);
  } else {
    typingEl.textContent = current.substring(0, charIndex++);
  }
  let delay = isDeleting ? 60 : 100;
  if (!isDeleting && charIndex === current.length + 1) {
    delay = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 400;
  }
  setTimeout(type, delay);
}

type();

// --- Scroll animation for timeline items ---
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));

// --- Contact form with Formspree ---
const form = document.getElementById('contact-form');

if (form) {
  const submitBtn = document.getElementById('submit-btn');
  const btnText = document.getElementById('btn-text');
  const btnLoading = document.getElementById('btn-loading');
  const formSuccess = document.getElementById('form-success');
  const formError = document.getElementById('form-error');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-flex';
    submitBtn.disabled = true;
    formSuccess.style.display = 'none';
    formError.style.display = 'none';

    const data = new FormData(form);
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        formSuccess.style.display = 'flex';
        form.reset();
      } else {
        formError.style.display = 'flex';
      }
    } catch (err) {
      formError.style.display = 'flex';
    } finally {
      btnText.style.display = 'inline-flex';
      btnLoading.style.display = 'none';
      submitBtn.disabled = false;
    }
  });
}

// --- Active nav link on scroll ---
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset;
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
});
