const form = document.getElementById("bookingForm");
const dateInput = document.getElementById("date");
const today = new Date();
dateInput.min = [
  today.getFullYear(),
  String(today.getMonth() + 1).padStart(2, "0"),
  String(today.getDate()).padStart(2, "0")
].join("-");
document.getElementById("year").textContent = new Date().getFullYear();

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "×" : "☰";
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "☰";
}));

document.querySelectorAll("[data-car]").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("car").value = link.dataset.car;
  });
});

form.addEventListener("submit", event => {
  event.preventDefault();
  const phone = document.getElementById("phone").value.trim();
  if (!/^[0-9]{10}$/.test(phone)) {
    document.getElementById("formStatus").textContent = "Please enter a valid 10-digit mobile number.";
    return;
  }

  const values = {
    name: document.getElementById("name").value.trim(),
    phone,
    car: document.getElementById("car").value,
    service: document.getElementById("service").value,
    pickup: document.getElementById("pickup").value.trim(),
    destination: document.getElementById("destination").value.trim(),
    date: document.getElementById("date").value,
    details: document.getElementById("message").value.trim() || "Not provided"
  };

  const message =
`Hello Vasanth Car Rentals, I would like to enquire about a booking.

Name: ${values.name}
Customer phone: ${values.phone}
Car: ${values.car}
Service: ${values.service}
Pickup: ${values.pickup}
Destination: ${values.destination}
Journey date: ${values.date}
Additional details: ${values.details}`;

  const url = "https://wa.me/919573373015?text=" + encodeURIComponent(message);
  window.open(url, "_blank", "noopener,noreferrer");
  document.getElementById("formStatus").textContent = "WhatsApp enquiry prepared. Please press Send in WhatsApp to submit it.";
});
