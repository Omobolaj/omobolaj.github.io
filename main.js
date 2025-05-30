document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
  
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark-theme' : 'light');
      });
    }
  
    // Apply saved theme
    if (localStorage.getItem('theme') === 'dark-theme') {
      document.body.classList.add('dark-theme');
    }
  
    // Loader
    const loader = document.getElementById('loader');
    if (loader) {
      setTimeout(() => {
        loader.style.display = 'none';
      }, 1500);
    }
  
    // AOS Init
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      offset: 120,
    });
  
    // Dynamic Project Loader
    const skills = document.querySelectorAll('.skill');
    const projectsContainer = document.querySelector('.projects-container');
  
    skills.forEach(skill => {
      skill.addEventListener('click', () => {
        const skillName = skill.getAttribute('data-skill').toLowerCase();
        fetch(`projects/${skillName}.html`)
          .then(response => response.text())
          .then(data => {
            projectsContainer.innerHTML = data;
            AOS.refresh();
          })
          .catch(() => {
            projectsContainer.innerHTML = '<p>Could not load projects for this skill.</p>';
          });
      });
    });
  
    // Fade-Up Observer
    const fadeUpObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        } else {
          entry.target.classList.remove('in-view');
        }
      });
    }, {
      threshold: 0.1
    });
  
    document.querySelectorAll('.fade-up').forEach(el => {
      fadeUpObserver.observe(el);
    });
  
    // Swiper
    const swiper = new Swiper('.mySwiper', {
      loop: true,
      spaceBetween: 20,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  
    // Typewriter Scroll
    function createTypewriterEffect(elementId) {
      const el = document.getElementById(elementId);
      const text = el?.getAttribute('data-text') || '';
      let timeout;
  
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && text.length > 0) {
            clearTimeout(timeout);
            el.style.width = '0';
            el.style.opacity = '1';
            let i = 0;
            const type = () => {
              if (i <= text.length) {
                el.textContent = text.substring(0, i);
                el.style.width = i + 'ch';
                i++;
                timeout = setTimeout(type, 80);
              }
            };
            type();
          }
        });
      }, { threshold: 0.5 });
  
      if (el) observer.observe(el);
    }
  
    createTypewriterEffect('typewriter');
    createTypewriterEffect('tagline-typewriter');
  });

// === Hero Image Slide-In Animation: Re-trigger on scroll ===
const heroPhoto = document.getElementById('hero-photo-container');

const heroObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      heroPhoto.classList.add('animate-right');
    } else {
      // Remove class when it scrolls out so it can re-trigger
      heroPhoto.classList.remove('animate-right');
    }
  });
}, { threshold: 0.5 });

if (heroPhoto) heroObserver.observe(heroPhoto);

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
  
    if (contactForm) {
      contactForm.addEventListener('submit', function (e) {
        setTimeout(() => {
          contactForm.reset(); // Clears the form
        }, 100); // Delay to ensure formspree captures data
      });
    }
  });
  

  