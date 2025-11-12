// Header/navigation: mobile menu, scroll spy, smooth scroll
export function initHeader() {
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
