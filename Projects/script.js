function toggleMenu() {
  const nav = document.getElementById("navLinks");
  nav.classList.toggle("active");
}

// Feather icons
document.addEventListener("DOMContentLoaded", function () {
  if (typeof feather !== "undefined") {
    feather.replace();
  }
});

// Scroll smooth untuk link yang mengarah ke ID (opsional jika kamu gunakan #top misalnya)
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

document.querySelectorAll(".category-btn").forEach((button) => {
  button.addEventListener("click", () => {
    // Hapus class active dari semua tombol
    document
      .querySelectorAll(".category-btn")
      .forEach((btn) => btn.classList.remove("active"));

    // Tambahkan class active ke tombol yang diklik
    button.classList.add("active");

    // Ambil nilai filter (misal: project1)
    const filter = button.getAttribute("data-filter");

    // Tampilkan hanya project sesuai filter (logika filter sederhana, opsional)
    document.querySelectorAll(".project-item").forEach((item) => {
      if (filter === "all" || item.classList.contains(filter)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});

// script.js
const categoryButtons = document.querySelectorAll(".category-btn");
const allSection = document.getElementById("category-all");

categoryButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const category = btn.getAttribute("data-category");

    // Toggle active class
    categoryButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    // Tampilkan hanya section 'All' jika diklik
    if (category === "all") {
      allSection.style.display = "block";
    } else {
      allSection.style.display = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".category-btn");
  const sections = {
    all: document.querySelector("#category-all"),
    Plugin: document.querySelector("#plugin-section"),
    AddOn: document.querySelector("#addon-section"),
    Worlds: document.querySelector("#worlds-section"),
  };

  let currentFilter = "all"; // All aktif di awal
  let isFirstSwitch = true; // Untuk mendeteksi klik pertama kali (tidak animasi jika ke All)

  buttons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const newFilter =
        btn.getAttribute("data-filter") ||
        btn.getAttribute("data-category") ||
        "all";

      if (newFilter === currentFilter) return;

      // Ganti tombol active
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const currentSection = sections[currentFilter];
      const newSection = sections[newFilter];

      if (!newSection || !currentSection) return;

      // Hilangkan section sekarang
      currentSection.classList.remove("active", "show-left", "show-right");
      currentSection.style.opacity = "0";
      currentSection.style.transform =
        newFilter > currentFilter ? "translateX(-20px)" : "translateX(20px)";

      setTimeout(() => {
        currentSection.style.display = "none";

        // Munculkan section baru
        newSection.style.display = "block";
        newSection.style.opacity = "0";

        // Atur arah swipe
        newSection.style.transform =
          newFilter > currentFilter ? "translateX(20px)" : "translateX(-20px)";

        requestAnimationFrame(() => {
          // Hanya beri animasi jika bukan awal & bukan pertama kali masuk ke "All"
          if (!(newFilter === "all" && isFirstSwitch)) {
            newSection.classList.add(
              newFilter > currentFilter ? "show-left" : "show-right"
            );
          }

          newSection.classList.add("active");
          newSection.style.opacity = "1";
          newSection.style.transform = "translateX(0)";
        });

        currentFilter = newFilter;
        isFirstSwitch = false;
      }, 300);
    });
  });
  document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".category-btn");
    const sections = {
      all: document.querySelector("#projects-category"),
      Plugin: document.querySelector("#plugin-section"),
      AddOn: document.querySelector("#addon-section"),
      Worlds: document.querySelector("#worlds-section"),
    };

    let currentFilter = "all"; // default aktif
    let currentSection = sections[currentFilter];

    // Tampilkan langsung "All" tanpa animasi
    currentSection.style.display = "block";
    currentSection.classList.add("show", "visible-left");

    buttons.forEach((btn) => {
      btn.addEventListener("click", function () {
        const filter = this.getAttribute("data-filter") || "all";
        if (filter === currentFilter) return; // tidak perlu animasi kalau sama

        // Tombol aktif
        buttons.forEach((b) => b.classList.remove("active"));
        this.classList.add("active");

        const nextSection = sections[filter];
        if (!nextSection) return;

        // Sembunyikan section aktif
        currentSection.classList.remove(
          "visible-left",
          "visible-right",
          "show"
        );
        setTimeout(() => {
          currentSection.style.display = "none";

          // Arah animasi
          const direction =
            filterOrder(filter) > filterOrder(currentFilter)
              ? "visible-right"
              : "visible-left";

          // Tampilkan section baru
          nextSection.style.display = "block";
          nextSection.classList.add("show");

          setTimeout(() => {
            nextSection.classList.add(direction);
          }, 10);

          currentSection = nextSection;
          currentFilter = filter;
        }, 300); // waktu hilang
      });
    });

    // Fungsi untuk urutan kategori agar tahu swipe kiri/kanan
    function filterOrder(name) {
      const order = ["all", "Plugin", "AddOn", "Worlds"];
      return order.indexOf(name);
    }
  });
});
