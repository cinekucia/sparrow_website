document.addEventListener('DOMContentLoaded', () => {
  // --- LANGUAGE SWITCHER ---
  const langSwitchBtn = document.getElementById('lang-switch-btn');
  const htmlElement = document.documentElement;
  const STORAGE_KEY = 'sparrows-lang';

  // Set initial language
  const getInitialLanguage = () => {
    const savedLang = localStorage.getItem(STORAGE_KEY);
    if (savedLang) return savedLang;
    
    // Auto-detect browser language
    const userLang = navigator.language || navigator.userLanguage;
    return userLang.toLowerCase().startsWith('pl') ? 'pl' : 'en';
  };

  const setLanguage = (lang) => {
    htmlElement.setAttribute('lang', lang);
    localStorage.setItem(STORAGE_KEY, lang);
  };

  // Toggle language on button click
  if (langSwitchBtn) {
    langSwitchBtn.addEventListener('click', () => {
      const currentLang = htmlElement.getAttribute('lang') || 'pl';
      const nextLang = currentLang === 'pl' ? 'en' : 'pl';
      setLanguage(nextLang);
    });
  }

  // Initialize lang
  setLanguage(getInitialLanguage());


  // --- MOBILE NAVIGATION MENU ---
  const menuToggle = document.getElementById('menu-toggle');
  const navLinksPl = document.getElementById('nav-links-pl');
  const navLinksEn = document.getElementById('nav-links-en');

  const toggleMobileMenu = () => {
    menuToggle.classList.toggle('active');
    navLinksPl.classList.toggle('active');
    navLinksEn.classList.toggle('active');
  };

  const closeMobileMenu = () => {
    menuToggle.classList.remove('active');
    navLinksPl.classList.remove('active');
    navLinksEn.classList.remove('active');
  };

  if (menuToggle) {
    menuToggle.addEventListener('click', toggleMobileMenu);
  }

  // Close menu when clicking a link
  const allNavLinks = document.querySelectorAll('.nav-links a');
  allNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    const isHeader = e.target.closest('#header');
    if (!isHeader && (navLinksPl.classList.contains('active') || navLinksEn.classList.contains('active'))) {
      closeMobileMenu();
    }
  });


  // --- HEADER SCROLL ACTION ---
  const header = document.getElementById('header');
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Call on load too


  // --- SCROLL SPY ACTIVE LINKS ---
  const sections = document.querySelectorAll('section');
  const navLinksArray = Array.from(allNavLinks);

  const scrollSpy = () => {
    const scrollPos = window.scrollY + 120; // offset for sticky header

    sections.forEach(section => {
      if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
        const currentId = section.getAttribute('id');
        navLinksArray.forEach(link => {
          if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };
  window.addEventListener('scroll', scrollSpy);
  scrollSpy(); // Call on load too


  // --- COPY EMAIL TO CLIPBOARD ---
  const emailTrigger = document.getElementById('email-copy-trigger');
  const tooltip = document.getElementById('email-tooltip');
  const targetEmail = document.getElementById('target-email').innerText;

  if (emailTrigger && tooltip) {
    emailTrigger.addEventListener('click', () => {
      // Copy to clipboard
      navigator.clipboard.writeText(targetEmail)
        .then(() => {
          // Show tooltip
          tooltip.classList.add('show');
          
          // Hide tooltip after 2.5s
          setTimeout(() => {
            tooltip.classList.remove('show');
          }, 2500);
        })
        .catch(err => {
          console.error('Could not copy text: ', err);
        });
    });
  }
});
