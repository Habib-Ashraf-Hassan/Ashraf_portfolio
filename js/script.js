// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all components
  initNavigation();
  initScrollEffects();
  initSkillBars();
  initContactForm();
  initBackToTop();
  initSmoothScrolling();
  initIntersectionObserver();
  initTabs();
});

// Navigation functionality
function initNavigation() {
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const navbar = document.getElementById("navbar");

  // Mobile menu toggle
  navToggle.addEventListener("click", function () {
    navMenu.classList.toggle("active");
    navToggle.classList.toggle("active");
  });

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");
    });
  });

  // Navbar scroll effect
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Active nav link highlighting
  function updateActiveNavLink() {
    const sections = document.querySelectorAll("section[id]");
    const scrollPos = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach((link) => link.classList.remove("active"));
        if (navLink) {
          navLink.classList.add("active");
        }
      }
    });
  }

  window.addEventListener("scroll", updateActiveNavLink);
  updateActiveNavLink(); // Call once on load
}

// Scroll effects and animations
function initScrollEffects() {
  // Animate elements on scroll
  const animateOnScroll = function () {
    const elements = document.querySelectorAll(
      ".timeline-content, .project-card, .stat-item, .contact-item, .cert-item"
    );

    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < window.innerHeight - elementVisible) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  };

  // Set initial state for animated elements
  const elements = document.querySelectorAll(
    ".timeline-content, .project-card, .stat-item, .contact-item, .cert-item"
  );
  elements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
  });

  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll(); // Call once on load
}

// Skill bars animation
function initSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress");

  const animateSkillBars = function () {
    skillBars.forEach((bar) => {
      const barTop = bar.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (barTop < windowHeight - 100) {
        const width = bar.getAttribute("data-width");
        bar.style.width = width;
      }
    });
  };

  window.addEventListener("scroll", animateSkillBars);
  animateSkillBars(); // Call once on load
}

// Contact form functionality
// function initContactForm() {
//   const contactForm = document.getElementById("contact-form");

//   if (contactForm) {
//     contactForm.addEventListener("submit", function (e) {
//       e.preventDefault();

//       // Get form data
//       const formData = new FormData(contactForm);
//       const name = formData.get("name");
//       const email = formData.get("email");
//       const subject = formData.get("subject");
//       const message = formData.get("message");

//       // Simple validation
//       if (!name || !email || !subject || !message) {
//         showNotification("Please fill in all fields.", "error");
//         return;
//       }

//       if (!isValidEmail(email)) {
//         showNotification("Please enter a valid email address.", "error");
//         return;
//       }

//       // Simulate form submission
//       const submitButton = contactForm.querySelector('button[type="submit"]');
//       const originalText = submitButton.textContent;

//       submitButton.textContent = "Sending...";
//       submitButton.disabled = true;

//       // Simulate API call
//       // Since this is a static site, redirect to email
//       setTimeout(() => {
//         const formData = new FormData(contactForm);
//         const name = formData.get("name");
//         const email = formData.get("email");
//         const subject = formData.get("subject");
//         const message = formData.get("message");

//         // Create email body
//         const emailBody = `Name: ${name}%0D%0AEmail: ${email}%0D%0ASubject: ${subject}%0D%0A%0D%0AMessage:%0D%0A${message}`;

//         // Open user's email client
//         window.location.href = `mailto:ashrafanil434@gmail.com?subject=Portfolio Contact: ${subject}&body=${emailBody}`;

//         showNotification(
//           "Your email client will open to send the message. Alternatively, you can email me directly at ashrafanil434@gmail.com",
//           "success"
//         );
//         contactForm.reset();
//         submitButton.textContent = originalText;
//         submitButton.disabled = false;
//       }, 1000);
//     });
//   }
// }
// Contact form functionality with Formspree
function initContactForm() {
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;

      // Simple validation
      const formData = new FormData(contactForm);
      const name = formData.get("name");
      const email = formData.get("_replyto");
      const subject = formData.get("subject");
      const message = formData.get("message");

      if (!name || !email || !subject || !message) {
        e.preventDefault();
        showNotification("Please fill in all fields.", "error");
        return;
      }

      if (!isValidEmail(email)) {
        e.preventDefault();
        showNotification("Please enter a valid email address.", "error");
        return;
      }

      // Show loading state
      submitButton.textContent = "Sending...";
      submitButton.disabled = true;

      // Let Formspree handle the submission
      // After submission, user will be redirected back and see success message
      setTimeout(() => {
        showNotification(
          "Message sent successfully! I'll get back to you soon.",
          "success"
        );
      }, 1000);
    });
  }
}

// Email validation helper
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(".notification");
  existingNotifications.forEach((notification) => notification.remove());

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease-in-out;
        max-width: 300px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    `;

  // Set background color based on type
  switch (type) {
    case "success":
      notification.style.background = "#10b981";
      break;
    case "error":
      notification.style.background = "#ef4444";
      break;
    case "warning":
      notification.style.background = "#f59e0b";
      break;
    default:
      notification.style.background = "#3b82f6";
  }

  // Add to DOM
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 5000);
}

// Back to top button functionality
function initBackToTop() {
  const backToTopButton = document.getElementById("back-to-top");

  if (backToTopButton) {
    // Show/hide button based on scroll position
    window.addEventListener("scroll", function () {
      if (window.scrollY > 300) {
        backToTopButton.classList.add("visible");
      } else {
        backToTopButton.classList.remove("visible");
      }
    });

    // Smooth scroll to top when clicked
    backToTopButton.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}

// Intersection Observer for animations
function initIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");

        // Special handling for counter animation
        if (entry.target.classList.contains("stat-number")) {
          animateCounter(entry.target);
        }

        // Special handling for skill bars
        if (entry.target.classList.contains("skill-progress")) {
          const width = entry.target.getAttribute("data-width");
          entry.target.style.width = width;
        }
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const elementsToObserve = document.querySelectorAll(
    ".hero-text, .hero-image, .about-text, .about-image, .timeline-item, .project-card, .skill-category, .contact-item, .stat-number, .skill-progress"
  );

  elementsToObserve.forEach((element) => {
    observer.observe(element);
  });
}
// Tab functionality for experience/education
function initTabs() {
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const tabName = this.getAttribute("data-tab");

      // Remove active class from all buttons and contents
      tabBtns.forEach((b) => b.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // Add active class to clicked button and corresponding content
      this.classList.add("active");
      document.getElementById(tabName + "-tab").classList.add("active");
    });
  });
}

// Counter animation for statistics
function animateCounter(element) {
  const target = parseInt(element.textContent.replace(/\D/g, ""));
  const duration = 2000;
  const start = 0;
  const increment = target / (duration / 16);

  let current = start;
  const timer = setInterval(function () {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }

    // Keep the '+' or other non-numeric characters
    const originalText = element.textContent;
    const nonNumeric = originalText.replace(/\d+/g, "");
    element.textContent = Math.floor(current) + nonNumeric.replace(/^\d+/, "");
  }, 16);
}

// Typing animation for hero section
function initTypingAnimation() {
  const typingElement = document.querySelector(".hero-subtitle");
  if (!typingElement) return;

  const texts = [
    "Data Scientist",
    "Web Developer",
    "Machine Learning Enthusiast",
    "Full Stack Developer",
    "Problem Solver",
  ];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeText() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      typingElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typeSpeed = 500; // Pause before next text
    }

    setTimeout(typeText, typeSpeed);
  }

  // Start typing animation after a delay
  setTimeout(typeText, 1000);
}

// Parallax effect for floating elements
function initParallaxEffect() {
  const floatingElements = document.querySelectorAll(".floating-element");

  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;

    floatingElements.forEach((element, index) => {
      const speed = parallaxSpeed * (index + 1) * 0.5;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
}

// Mouse cursor effect (optional - for modern browsers)
function initCursorEffect() {
  const cursor = document.createElement("div");
  cursor.className = "custom-cursor";
  cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(59, 130, 246, 0.3);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        mix-blend-mode: difference;
    `;

  document.body.appendChild(cursor);

  document.addEventListener("mousemove", function (e) {
    cursor.style.left = e.clientX - 10 + "px";
    cursor.style.top = e.clientY - 10 + "px";
  });

  // Enlarge cursor on hover over interactive elements
  const interactiveElements = document.querySelectorAll(
    "a, button, .project-card, .nav-link"
  );

  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", function () {
      cursor.style.transform = "scale(2)";
    });

    element.addEventListener("mouseleave", function () {
      cursor.style.transform = "scale(1)";
    });
  });
}

// Image lazy loading
function initLazyLoading() {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// Progress bar for page loading
function initProgressBar() {
  const progressBar = document.createElement("div");
  progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #3b82f6, #f59e0b);
        z-index: 10000;
        transition: width 0.3s ease;
    `;

  document.body.appendChild(progressBar);

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    progressBar.style.width = scrollPercent + "%";
  });
}

// Theme toggle functionality (optional)
function initThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle");
  if (!themeToggle) return;

  const currentTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", currentTheme);

  themeToggle.addEventListener("click", function () {
    const theme = document.documentElement.getAttribute("data-theme");
    const newTheme = theme === "light" ? "dark" : "light";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  });
}

// Performance optimization - Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Optimize scroll events
const debouncedScrollHandler = debounce(function () {
  // Your scroll handling code here
}, 10);

window.addEventListener("scroll", debouncedScrollHandler);

// Initialize additional features
document.addEventListener("DOMContentLoaded", function () {
  // Initialize optional features
  initTypingAnimation();
  initParallaxEffect();
  initProgressBar();
  initLazyLoading();

  // Only enable cursor effect on desktop
  if (window.innerWidth > 768) {
    initCursorEffect();
  }

  // Add loaded class to body for CSS animations
  setTimeout(() => {
    document.body.classList.add("loaded");
  }, 100);
});

// Handle window resize
window.addEventListener(
  "resize",
  debounce(function () {
    // Recalculate any position-dependent animations
    const floatingElements = document.querySelectorAll(".floating-element");
    floatingElements.forEach((element) => {
      element.style.transform = "translateY(0)";
    });
  }, 250)
);

// Error handling for images
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    img.addEventListener("error", function () {
      // Replace with placeholder or hide the image
      this.style.display = "none";
      console.warn("Image failed to load:", this.src);
    });
  });
});

// Console greeting
console.log(
  "%c🚀 Welcome to Ashraf's Portfolio!",
  "color: #3b82f6; font-size: 20px; font-weight: bold;"
);
console.log(
  "%cIf you're looking at this, you might be interested in the code. Check out the repository!",
  "color: #6b7280; font-size: 14px;"
);
