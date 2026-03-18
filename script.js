
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const revealItems = document.querySelectorAll('.reveal');

const projectModal = document.getElementById('projectModal');
const closeModalBtn = document.getElementById('closeModal');
const modalTitle = document.getElementById('modalTitle');
const modalText = document.getElementById('modalText');
const modalImage = document.getElementById('modalImage');
const cardButtons = document.querySelectorAll('.card-btn');

if (menuToggle) {
  menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
}

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.dataset.filter;

    projectCards.forEach(card => {
      const category = card.dataset.category;
      card.classList.toggle('hidden', !(filter === 'all' || category === filter));
    });
  });
});

cardButtons.forEach(button => {
  button.addEventListener('click', () => {
    modalTitle.textContent = button.dataset.title;
    modalText.textContent = button.dataset.text;
    modalImage.src = button.dataset.image;
    modalImage.alt = button.dataset.title;
    projectModal.classList.add('show');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
});

function closeModal() {
  projectModal.classList.remove('show');
  projectModal.setAttribute('aria-hidden', 'true');
  modalImage.src = '';
  document.body.style.overflow = '';
}

if (closeModalBtn) {
  closeModalBtn.addEventListener('click', closeModal);
}

if (projectModal) {
  projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) closeModal();
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && projectModal.classList.contains('show')) closeModal();
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealItems.forEach(item => revealObserver.observe(item));
