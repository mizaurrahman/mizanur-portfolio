(() => {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const mobileNav = document.querySelector(".mobile-nav");

  const setScrolled = () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 12);
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

  const skills = document.querySelectorAll(".skill");
  if ("IntersectionObserver" in window && skills.length) {
    const skillIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const bar = entry.target.querySelector(".skill__bar span");
          const value = entry.target.getAttribute("data-value") || "0";
          if (bar) bar.style.width = `${value}%`;
          skillIo.unobserve(entry.target);
        });
      },
      { threshold: 0.35 }
    );
    skills.forEach((el) => skillIo.observe(el));
  } else {
    skills.forEach((el) => {
      const bar = el.querySelector(".skill__bar span");
      const value = el.getAttribute("data-value") || "0";
      if (bar) bar.style.width = `${value}%`;
    });
  }
})();
