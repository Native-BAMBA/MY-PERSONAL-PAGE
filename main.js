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