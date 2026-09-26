const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const toast = document.querySelector(".toast");

navToggle?.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

siteNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll("[data-current-year]").forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});

let toastTimer;
function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2400);
}

document.querySelectorAll("[data-placeholder-link]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    showToast("Template link — replace this URL with your own.");
  });
});

document.querySelectorAll("[data-citation]").forEach((button) => button.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(button.dataset.citation);
    showToast("Citation copied.");
  } catch {
    showToast("Copy unavailable in this preview.");
  }
}));

const pageSections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];

const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visibleEntry = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visibleEntry) return;
    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${visibleEntry.target.id}`);
    });
  },
  { rootMargin: "-25% 0px -60%", threshold: [0.1, 0.35] }
);

pageSections.forEach((section) => sectionObserver.observe(section));
