
// PAGE LOADER
document.body.classList.add("loading");

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  setTimeout(() => {
    loader.classList.add("hidden");
    document.body.classList.remove("loading");
  }, 500);
});


// HEADER SCROLL EFFECT
const header = document.getElementById("header");

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 60);
}

window.addEventListener("scroll", updateHeader);
updateHeader();


// MOBILE NAVIGATION
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close menu" : "Open menu"
  );
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
  });
});


// SCROLL REVEAL ANIMATIONS
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  revealElements.forEach(element => observer.observe(element));
} else {
  revealElements.forEach(element => element.classList.add("visible"));
}


// MENU FILTER
const menuTabs = document.querySelectorAll(".menu-tab");
const dishes = document.querySelectorAll(".dish");

menuTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    const category = tab.dataset.category;

    menuTabs.forEach(item => item.classList.remove("active"));
    tab.classList.add("active");

    dishes.forEach(dish => {
      const matches = category === "all" ||
        dish.dataset.category === category;

      dish.classList.toggle("hidden", !matches);
    });
  });
});


// BOOKING FORM DEMO
const bookingForm = document.getElementById("bookingForm");
const bookingDate = document.getElementById("bookingDate");
const formMessage = document.getElementById("formMessage");

// Prevent selecting a date in the past.
const today = new Date();
const localToday = new Date(
  today.getTime() - today.getTimezoneOffset() * 60000
).toISOString().split("T")[0];

bookingDate.min = localToday;

bookingForm.addEventListener("submit", event => {
  event.preventDefault();

  if (!bookingForm.reportValidity()) return;

  const name = document.getElementById("guestName").value.trim();
  const date = bookingDate.value;
  const guests = document.getElementById("guestCount").value;
  const time = document.getElementById("bookingTime").value;

  if (!name || !date) return;

  const formattedDate = new Date(date + "T12:00:00").toLocaleDateString(
    "en-AU",
    {
      day: "numeric",
      month: "long",
      year: "numeric"
    }
  );

  formMessage.textContent =
    `Thanks, ${name}! Your demo request is for ${guests} guest(s) on ${formattedDate} at ${time}. This is a demonstration only — no reservation has been made.`;

  bookingForm.reset();
  bookingDate.min = localToday;
});
