document.addEventListener('DOMContentLoaded', () => {
  // --- LANGUAGE SWITCHER ---
  const langDropdown = document.getElementById('lang-dropdown');
  const langDropdownBtn = document.getElementById('lang-dropdown-btn');
  const langDropdownItems = document.querySelectorAll('.lang-dropdown-item');
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

    // Update active class in dropdown items
    langDropdownItems.forEach(item => {
      if (item.getAttribute('data-lang') === lang) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Re-run scrollSpy if it is defined to update nav link active states immediately
    if (typeof scrollSpy === 'function') {
      scrollSpy();
    }
  };

  // Toggle dropdown on button click
  if (langDropdownBtn && langDropdown) {
    langDropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = langDropdown.classList.toggle('open');
      langDropdownBtn.setAttribute('aria-expanded', isOpen);
    });
  }

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (langDropdown && langDropdown.classList.contains('open')) {
      if (!langDropdown.contains(e.target)) {
        langDropdown.classList.remove('open');
        langDropdownBtn.setAttribute('aria-expanded', 'false');
      }
    }
  });

  // Switch language on item click
  langDropdownItems.forEach(item => {
    item.addEventListener('click', () => {
      const selectedLang = item.getAttribute('data-lang');
      setLanguage(selectedLang);
    });
  });

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
