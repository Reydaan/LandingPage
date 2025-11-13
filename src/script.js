// All JavaScript in one file - NO modules
document.addEventListener("DOMContentLoaded", () => {
  initHero();
  initHeader();
  initGallery();
  initCollections();
  initContact();
  initWhatssap();
  initFaq();
});

// Hero: carousel + parallax
function initHero() {
  const slides = document.querySelectorAll(".carousel-slide");
  const indicators = document.querySelectorAll(".indicator");
  let currentSlide = 0;
  let slideInterval;

  function showSlide(index) {
    slides.forEach((slide) => slide.classList.remove("active"));
    indicators.forEach((ind) => ind.classList.remove("active"));
    if (!slides[index]) return;
    slides[index].classList.add("active");
    if (indicators[index]) indicators[index].classList.add("active");
    currentSlide = index;
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function startSlideShow() {
    if (slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 4000);
  }

  function stopSlideShow() {
    if (slideInterval) clearInterval(slideInterval);
  }

  if (slides.length > 0) {
    startSlideShow();
    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        stopSlideShow();
        showSlide(index);
        startSlideShow();
      });
    });

    const carousel = document.querySelector(".hero-carousel");
    if (carousel) {
      carousel.addEventListener("mouseenter", stopSlideShow);
      carousel.addEventListener("mouseleave", startSlideShow);
    }
  }

  // Parallax
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector(".hero-content");
    if (parallax) {
      parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  });
}

// Header/navigation: mobile menu, scroll spy, smooth scroll
function initHeader() {
  const menuToggle = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-links a");
  const navbar = document.getElementById("navbar");
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active");
      mobileNav.classList.toggle("active");
    });

    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        mobileNav.classList.remove("active");
      });
    });
  }

  function updateActiveNav() {
    const scrollY = window.pageYOffset;
    const navHeight = navbar ? navbar.offsetHeight : 0;

    if (navbar) {
      if (scrollY > 100) navbar.classList.add("scrolled");
      else navbar.classList.remove("scrolled");
    }

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - navHeight - 10;
      const sectionId = section.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + sectionId) link.classList.add("active");
        });
      }
    });

    if (scrollY < 100) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#home") link.classList.add("active");
      });
    }
  }

  window.addEventListener("scroll", updateActiveNav);
  window.addEventListener("resize", updateActiveNav);
  updateActiveNav();

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const navHeight = navbar ? navbar.offsetHeight : 0;
      let offsetTop = targetId === "#home" ? 0 : target.offsetTop - navHeight;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    });
  });
}

// Gallery Lightbox
function initGallery() {
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxClose = document.querySelector(".lightbox-close");
  const lightboxPrev = document.querySelector(".lightbox-prev");
  const lightboxNext = document.querySelector(".lightbox-next");
  const galleryItems = document.querySelectorAll(".gallery-item img");

  if (!lightbox || !lightboxImage || galleryItems.length === 0) return;

  let currentImageIndex = 0;
  const imageArray = Array.from(galleryItems);

  function openLightbox(index) {
    currentImageIndex = index;
    lightboxImage.src = imageArray[index].src;
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  function showNext() {
    currentImageIndex = (currentImageIndex + 1) % imageArray.length;
    lightboxImage.src = imageArray[currentImageIndex].src;
  }

  function showPrev() {
    currentImageIndex = (currentImageIndex - 1 + imageArray.length) % imageArray.length;
    lightboxImage.src = imageArray[currentImageIndex].src;
  }

  // Gallery item click
  galleryItems.forEach((img, index) => {
    img.parentElement.addEventListener("click", () => {
      openLightbox(index);
    });
  });

  // Close button
  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);

  // Next/Prev buttons
  if (lightboxNext) lightboxNext.addEventListener("click", showNext);
  if (lightboxPrev) lightboxPrev.addEventListener("click", showPrev);

  // Close on background click
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (lightbox.classList.contains("active")) {
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "Escape") closeLightbox();
    }
  });
}

// Collections: category filter
function initCollections() {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const collectionCards = document.querySelectorAll(".collection-card");

  if (!tabButtons.length || !collectionCards.length) return;

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const category = btn.dataset.category;
      tabButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      collectionCards.forEach((card) => {
        if (category === "all" || card.dataset.category === category) {
          card.style.display = "block";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.animation = "fadeInUp 0.6s ease forwards";
          }, 100);
        } else {
          card.style.opacity = "0";
          setTimeout(() => {
            card.style.display = "none";
          }, 300);
        }
      });
    });
  });
}

// Contact form and inputs
function initContact() {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    const submitBtn = contactForm.querySelector(".form-submit");
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.style.opacity = "0.7";
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.textContent = "Message Sent! ✓";
      submitBtn.style.background = "#4CAF50";
      contactForm.reset();
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = "";
        submitBtn.style.opacity = "";
        submitBtn.disabled = false;
      }, 3000);
    }, 1500);
  });

  const formInputs = document.querySelectorAll(".form-group input, .form-group textarea");
  formInputs.forEach((input) => {
    input.addEventListener("focus", () => {
      input.parentElement.style.transform = "translateY(-2px)";
    });
    input.addEventListener("blur", () => {
      input.parentElement.style.transform = "";
    });
  });
}

// WhatsApp
function initWhatssap() {
  // WhatsApp initialization logic here
}

// FAQ Accordion
function initFaq() {
  const faqs = document.querySelectorAll(".faq-item");

  faqs.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
      item.classList.toggle("active");

      // Fecha os outros ao abrir um
      faqs.forEach((other) => {
        if (other !== item) other.classList.remove("active");
      });
    });
  });
}
