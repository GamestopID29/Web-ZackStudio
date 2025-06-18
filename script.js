function toggleMenu() {
  const nav = document.getElementById("navLinks");
  nav.classList.toggle("active");
}

// FAQ toggle with exclusive open behavior and icon change
document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const currentItem = button.parentElement;
    const isActive = currentItem.classList.contains("active");

    // Close all FAQ items
    document.querySelectorAll(".faq-item").forEach((item) => {
      item.classList.remove("active");
    });

    // If not already active, open this one
    if (!isActive) {
      currentItem.classList.add("active");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const video = document.querySelector(".about-logo");

  if (!video) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          video.pause();
          video.currentTime = 0;
        } else {
          video.play();
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  observer.observe(video);
});

function scrollToTop(event) {
  event.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
