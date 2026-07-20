const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");

menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".main-nav a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

const langButtons = document.querySelectorAll(".lang");
const translatable = document.querySelectorAll("[data-es][data-ca]");

function setLanguage(language) {
  document.documentElement.lang = language;
  translatable.forEach(element => {
    element.textContent = element.dataset[language];
  });
  langButtons.forEach(button => {
    button.classList.toggle("active", button.dataset.lang === language);
  });
  localStorage.setItem("mistik-language", language);
}

langButtons.forEach(button => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

setLanguage(localStorage.getItem("mistik-language") || "es");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(element => observer.observe(element));
document.getElementById("year").textContent = new Date().getFullYear();
