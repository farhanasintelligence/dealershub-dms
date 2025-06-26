AOS.init({
  duration: 1200,
});

document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("dashboard-container");
  const image = document.getElementById("dashboard-image");

  if (container && image) {
    let isHovering = false;
    let originalTransform = "";

    // Store original scroll animation class
    container.addEventListener("mouseenter", function () {
      isHovering = true;
      originalTransform = image.style.transform || "";
      // Add scroll animation class
      image.classList.add("group-hover:animate-scroll-y");
    });

    container.addEventListener("mousemove", function (e) {
      if (!isHovering) return;

      // Get mouse position relative to container
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate percentage position
      const xPercent = x / rect.width;
      const yPercent = y / rect.height;

      // Apply zoom effect (scale 1.1) and move based on mouse position
      image.style.transform = `scale(1.1) translate(${-xPercent * 10}px, ${
        -yPercent * 10
      }px)`;
    });

    // Reset transform when mouse leaves
    container.addEventListener("mouseleave", function () {
      isHovering = false;
      image.style.transform = originalTransform;
      // Remove scroll animation class when not hovering
      image.classList.remove("group-hover:animate-scroll-y");
    });
  }
  // State
  let currentStep = 1;
  const appointment = { date: "", time: "" };
  const user = { firstName: "", lastName: "", email: "", mobile: "" };

  // Elements
  const steps = [
    document.getElementById("step-1"),
    document.getElementById("step-2"),
    document.getElementById("step-3"),
  ];
  const backBtn = document.getElementById("back-btn");
  const nextBtn1 = document.getElementById("next-btn-1");
  const dateInput = document.getElementById("appointment-date");
  const timeInput = document.getElementById("appointment-time");
  const confirmationDetails = document.getElementById("confirmation-details");
  const modal = document.getElementById("appointment-modal");
  const openModalBtn = document.getElementById("open-appointment-modal");
  const closeModalBtn = document.getElementById("close-appointment-modal");
  const userDetailsForm = document.getElementById("user-details-form");

  // Step navigation
  function showStep(step) {
    steps.forEach(
      (el, idx) => (el.style.display = idx === step - 1 ? "" : "none")
    );
    backBtn.style.display = step > 1 ? "" : "none";
    currentStep = step;
    if (step === 3) {
      confirmationDetails.textContent =
        formatDate(appointment.date) + " at " + appointment.time;
    }
  }

  function goNextStep() {
    if (currentStep === 1) {
      appointment.date = dateInput.value;
      appointment.time = timeInput.value;
      showStep(2);
    } else if (currentStep === 2) {
      user.firstName = document.getElementById("first-name").value;
      user.lastName = document.getElementById("last-name").value;
      user.email = document.getElementById("email").value;
      user.mobile = document.getElementById("mobile").value;
      showStep(3);
    }
  }

  function goBackStep() {
    if (currentStep > 1) showStep(currentStep - 1);
  }

  // Enable/disable Next button on step 1
  function updateNextBtn1() {
    nextBtn1.disabled = !(dateInput.value && timeInput.value);
  }
  dateInput.addEventListener("change", updateNextBtn1);
  timeInput.addEventListener("change", updateNextBtn1);

  // Format date for confirmation
  function formatDate(dateStr) {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  // Modal open/close
  openModalBtn.addEventListener("click", function () {
    modal.style.display = "flex";
    showStep(1);
    // Reset form fields
    dateInput.value = "";
    timeInput.value = "";
    updateNextBtn1();
    userDetailsForm.reset();
  });
  closeModalBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  // Form submit for step 2
  userDetailsForm.addEventListener("submit", function (e) {
    e.preventDefault();
    goNextStep();
  });

  // Make functions global for inline HTML event handlers
  window.goNextStep = goNextStep;
  window.goBackStep = goBackStep;

  // Attach event listener for the Next button on step 1
  nextBtn1.addEventListener("click", goNextStep);

  // Initialize
  showStep(1);
});

// Custom Counter
// Set your countdown time here
// Example: 3 days, 12 hours, 49 minutes, 54 seconds
let days = 0;
let hours = 0;
let minutes = 0;
let seconds = 54;

// You can set these values from JS as needed
function setCountdown(d, h, m, s) {
  days = d;
  hours = h;
  minutes = m;
  seconds = s;
  updateCountdown();
}

function pad(n) {
  return n.toString().padStart(2, "0");
}

function updateCountdown() {
  const cd = document.getElementById("countdown");
  if (!cd) return;
  cd.innerHTML = `
      <span class="cd-box">${pad(days)}</span>
      <span class="cd-sep">:</span>
      <span class="cd-box">${pad(hours)}</span>
      <span class="cd-sep">:</span>
      <span class="cd-box">${pad(minutes)}</span>
      <span class="cd-sep">:</span>
      <span class="cd-box">${pad(seconds)}</span>
    `;
}

function tick() {
  if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) return;
  if (seconds > 0) {
    seconds--;
  } else {
    seconds = 59;
    if (minutes > 0) {
      minutes--;
    } else {
      minutes = 59;
      if (hours > 0) {
        hours--;
      } else {
        hours = 23;
        if (days > 0) {
          days--;
        }
      }
    }
  }
  updateCountdown();
}

// Start countdown
updateCountdown();
let interval = setInterval(() => {
  tick();
  if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
    clearInterval(interval);
  }
}, 1000);

// Example: To set a new countdown, call setCountdown(days, hours, minutes, seconds)
// setCountdown(1, 2, 3, 4);cookie-consent-box
