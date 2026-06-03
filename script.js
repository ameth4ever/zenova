document.addEventListener("DOMContentLoaded", () => {
  // 1. Set current year in footer
  document.getElementById("currentYear").textContent = new Date().getFullYear();

  // 2. Countdown Timer Logic
  // Set launch date to 30 days from now
  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 30);

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  function updateCountdown() {
    const currentTime = new Date();
    const diff = launchDate - currentTime;

    if (diff > 0) {
      const days = Math.floor(diff / 1000 / 60 / 60 / 24);
      const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
      const minutes = Math.floor(diff / 1000 / 60) % 60;
      const seconds = Math.floor(diff / 1000) % 60;

      // Add leading zeros
      daysEl.textContent = days < 10 ? "0" + days : days;
      hoursEl.textContent = hours < 10 ? "0" + hours : hours;
      minutesEl.textContent = minutes < 10 ? "0" + minutes : minutes;
      secondsEl.textContent = seconds < 10 ? "0" + seconds : seconds;
    } else {
      // Timer has ended
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";
      clearInterval(timerInterval);
    }
  }

  // Initial call and start interval
  updateCountdown();
  const timerInterval = setInterval(updateCountdown, 1000);

  // 3. Scroll Animations (Intersection Observer)
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15,
  };

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll(".animate-on-scroll");
  animatedElements.forEach((el) => scrollObserver.observe(el));
});
