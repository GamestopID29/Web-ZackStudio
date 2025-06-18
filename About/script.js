function toggleMenu() {
  const nav = document.getElementById("navLinks");
  nav.classList.toggle("active");
}

function revealOnScroll() {
  const elements = document.querySelectorAll(".animate-on-scroll");
  const windowHeight = window.innerHeight;

  elements.forEach((el) => {
    const position = el.getBoundingClientRect().top;
    if (position < windowHeight - 100) {
      el.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
