const backdrop = document.getElementById('backdrop');
const contactPanel = document.getElementById('contact-panel');

/* ======================== */
/* OPEN */
/* ======================== */
function openContact() {
  backdrop.classList.add('active');
  contactPanel.classList.add('active');
  contactPanel.style.transform = 'translateX(0)';
}

/* ======================== */
/* CLOSE */
/* ======================== */
function closeContact() {
  backdrop.classList.remove('active');
  contactPanel.classList.remove('active');
  contactPanel.style.transform = 'translateX(0)';
}

backdrop.addEventListener('click', e => {
  e.stopPropagation();
});

/* ======================== */
/* FORM REVEAL */
/* ======================== */
const revealBtn = document.getElementById('revealFormBtn');

revealBtn.addEventListener('click', () => {
  form.classList.add('active');
  revealBtn.style.display = 'none';
});

function closeContact() {
  backdrop.classList.remove('active');
  contactPanel.classList.remove('active');
  contactPanel.style.transform = 'translateX(0)';

  form.classList.remove('active');
  revealBtn.style.display = 'block';
}

/* ======================== */
/* SWIPE TO CLOSE (RIGHT) */
/* ======================== */
let startX = 0;
let currentX = 0;
let isDragging = false;

contactPanel.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
  isDragging = true;
});

contactPanel.addEventListener('touchmove', e => {
  if (!isDragging) return;

  currentX = e.touches[0].clientX;
  const delta = currentX - startX;

  /* Allow swipe ONLY to the right */
  if (delta > 0) {
    contactPanel.style.transform = `translateX(${delta}px)`;
  }
});

contactPanel.addEventListener('touchend', () => {
  isDragging = false;

  /* Close if swipe is far enough */
  if (currentX - startX > 120) {
    closeContact();
  } else {
    contactPanel.style.transform = 'translateX(0)';
  }
});

/* ======================== */
/* RIPPLE EFFECT */
/* ======================== */
document
  .querySelectorAll(".btn, .contact-btn, #contact-panel button")
  .forEach(btn => {
    btn.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      ripple.classList.add("ripple");

      const rect = btn.getBoundingClientRect();
      ripple.style.left = e.clientX - rect.left + "px";
      ripple.style.top = e.clientY - rect.top + "px";

      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

/* ======================== */
/* SUBMISSION MESSAGE NOTIF*/
/* ======================== */
const form = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');

form.addEventListener('submit', e => {
  e.preventDefault();

  const submitBtn = form.querySelector('button[type="submit"]');

  // --- Sending state ---
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';
  successMessage.style.color = '#555';
  successMessage.textContent = '⏳ Sending your message...';
  successMessage.classList.add('show');

  fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
    headers: { 'Accept': 'application/json' }
  })
  .then(response => {
    if (response.ok) {
      // --- Success ---
      successMessage.style.color = '#2f9c9d';
      successMessage.textContent = '✅ Message received! I’ll reply soon.';
      form.reset();

      setTimeout(() => {
        successMessage.classList.remove('show');
        closeContact();
      }, 2500);
    } else {
      throw new Error();
    }
  })
  .catch(() => {
    // --- Error ---
    successMessage.style.color = '#e63946';
    successMessage.textContent = '❌ Something went wrong. Please try again.';
  })
  .finally(() => {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send';
  });
});


/* ======================== */
/* FOOTER TYPING EFFECT */
/* ======================== */
const words = ["Innovate", "Create", "Learn", "Build", "Explore"];
let wordIndex = 0;
let charIndex = 0;
let typingSpeed = 100;
let delayBetweenWords = 2000;

const footerText = document.getElementById("footer-text");

function typeWord() {
  if (charIndex < words[wordIndex].length) {
    footerText.textContent += words[wordIndex][charIndex];
    charIndex++;
    setTimeout(typeWord, typingSpeed);
  } else {
    setTimeout(deleteWord, delayBetweenWords);
  }
}

function deleteWord() {
  if (charIndex > 0) {
    footerText.textContent =
      words[wordIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(deleteWord, typingSpeed / 2);
  } else {
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(typeWord, typingSpeed);
  }
}

typeWord();