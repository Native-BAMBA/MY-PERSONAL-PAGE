const backdrop = document.getElementById('backdrop');
const contactPanel = document.getElementById('contact-panel');

/* OPEN */
function openContact() {
  backdrop.classList.add('active');
  contactPanel.classList.add('active');
}

/* CLOSE */
function closeContact() {
  backdrop.classList.remove('active');
  contactPanel.classList.remove('active');
  contactPanel.style.transform = 'translateY(0)';
}

/* SWIPE TO CLOSE */
let startY = 0;
let currentY = 0;
let isDragging = false;

contactPanel.addEventListener('touchstart', e => {
  startY = e.touches[0].clientY;
  isDragging = true;
});

contactPanel.addEventListener('touchmove', e => {
  if (!isDragging) return;
  currentY = e.touches[0].clientY;
  const delta = currentY - startY;
  if (delta > 0) {
    contactPanel.style.transform = `translateY(${delta}px)`;
  }
});

contactPanel.addEventListener('touchend', () => {
  isDragging = false;
  if (currentY - startY > 120) {
    closeContact();
  } else {
    contactPanel.style.transform = 'translateY(0)';
  }
});

document.querySelectorAll(".btn, .contact-btn, #contact-panel button").forEach(btn => {
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

const words = ["Innovate", "Create", "Learn", "Build", "Explore"];
let wordIndex = 0;
let charIndex = 0;
let typingSpeed = 100; // milliseconds per character
let delayBetweenWords = 2000; // 2s pause after full word

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
    footerText.textContent = words[wordIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(deleteWord, typingSpeed / 2);
  } else {
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(typeWord, typingSpeed);
  }
}

// Start the typing effect
typeWord();