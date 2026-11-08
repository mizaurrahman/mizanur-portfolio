(() => {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const topbar = document.querySelector(".topbar");
  const toggle = document.querySelector(".nav-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  const sideLinks = [...document.querySelectorAll(".side-nav a")];
  const sectionIds = sideLinks.map((link) => link.dataset.section).filter(Boolean);

  const setScrolled = () => {
    if (!topbar) return;
    topbar.classList.toggle("scrolled", window.scrollY > 12);
  };

  setScrolled();
  window.addEventListener("scroll", setScrolled, { passive: true });

  if (toggle && mobileNav) {
    const closeMenu = () => {
      mobileNav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    };

    toggle.addEventListener("click", () => {
      const open = !mobileNav.classList.contains("open");
      mobileNav.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
  }

  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("in"));
  }

  const markActive = () => {
    if (!sideLinks.length) return;
    let current = "top";
    const offset = window.innerHeight * 0.28;
    for (const id of sectionIds) {
      const el = id === "top" ? document.getElementById("top") : document.getElementById(id);
      if (!el) continue;
      const top = el.getBoundingClientRect().top;
      if (top - offset <= 0) current = id;
    }
    sideLinks.forEach((link) => {
      link.classList.toggle("active", link.dataset.section === current);
    });
  };

  markActive();
  window.addEventListener("scroll", markActive, { passive: true });
})();
