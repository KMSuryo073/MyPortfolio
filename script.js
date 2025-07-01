function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

const toggle = document.getElementById("dark-mode-toggle");

toggle.addEventListener("click", () => {
  // Toggle dark mode on body
  const isDark = document.body.classList.toggle("dark-mode");

  // Save theme preference
  localStorage.setItem("theme", isDark ? "dark" : "light");

  // Remove existing icon (either <svg> or <i>)
  toggle.innerHTML = "";

  // Create new <i> element with appropriate icon
  const newIcon = document.createElement("i");
  newIcon.setAttribute("data-lucide", isDark ? "sun" : "moon");
  toggle.appendChild(newIcon);

  // Render Lucide icon
  lucide.createIcons();
});

window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  const isDark = savedTheme === "dark";

  if (isDark) {
    document.body.classList.add("dark-mode");
  }

  // Ensure toggle button starts with the correct icon
  toggle.innerHTML = "";
  const initialIcon = document.createElement("i");
  initialIcon.setAttribute("data-lucide", isDark ? "sun" : "moon");
  toggle.appendChild(initialIcon);

  lucide.createIcons();
});

//Personal Chatbot
const chatLog = document.getElementById("chat-log");
const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");

sendBtn.addEventListener("click", handleUserInput);
chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleUserInput();
});

function handleUserInput() {
  const input = chatInput.value.trim();
  if (!input) return;

  appendMessage("user", input);
  chatInput.value = "";

  const response = getAIResponse(input.toLowerCase());
  appendMessage("bot", response);
}

function appendMessage(sender, text) {
  const msg = document.createElement("div");
  msg.className = `message ${sender}`;
  msg.textContent = text;
  chatLog.appendChild(msg);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function getAIResponse(input) {
  // Greetings
  if (input.includes("hello") || input.includes("hey") || input.includes("helo")) {
    return "Hi there! 👋 How can I assist you today?";
  }
  if (input.includes("kresna")) {
    return "Yes? Anything I can assist you today? You can ask me about my skills, projects, education, or contact details.";
  }

  // Skills
  if (input.includes("skills") || input.includes("technologies") || input.includes("skill")) {
    return "I have experience with Web and Software developing as well as AI engineering and more!";
  }
  if (input.includes("programming languages") || input.includes("coding languages")) {
    return "I'm familiar with Java, JavaScript, Python, and some SQL.";
  }

  // Education
  if (input.includes("education") || input.includes("study")) {
    return "I'm currently pursuing my studies in Informatics with a concentration in Artificial Intelligence at President University.";
  }
  if (input.includes("university")) {
    return "I'm currently a student at President University, focusing on AI as my concentration pick.";
  }

  // Projects
  if (input.includes("projects") || input.includes("portfolio") || input.includes("project")) {
    return "You can explore my projects in the Projects section. I’ve worked on things like Face Recognition Attendance Systems and interactive websites.";
  }
  if (input.includes("face recognition") || input.includes("attendance system")) {
    return "Yes! I built a facial recognition-based attendance system for PT Mattel Indonesia as part of my project.";
  }

  // Experience
  if (input.includes("experience") || input.includes("work")) {
    return "I'm building my professional experience through projects, collaborations, and continuously learning new technologies.";
  }

  // Contact & Collaboration
  if (input.includes("contact") || input.includes("reach you")) {
    return "You can contact me via the Contact section below or directly to kmsuryo@gmail.com. I'd love to connect!";
  }
  if (input.includes("collaborate") || input.includes("work together")) {
    return "I'm always open to exciting collaborations and new opportunities. Let's connect through the Contact section!";
  }

  // AI Interest
  if (input.includes("ai") || input.includes("artificial intelligence")) {
    return "AI is my main passion! I'm exploring how it can enhance software, solve problems, and improve human experiences.";
  }
  if (input.includes("chatbot") || input.includes("this bot") || input.includes("what is this") ) {
    return "This chatbot is a simple rule-based system I built to answer common questions about me!";
  }

  // Fun or Extra
  if (input.includes("hobby") || input.includes("hobbies")) {
    return "Apart from coding, I enjoy exploring new ideas, working on personal development, and other things like cooking and piano.";
  }
  if (input.includes("goal") || input.includes("dream")) {
    return "My current goal is to become a well-rounded AI engineer although I have many more dreams in the future.";
  }
  if (input.includes("linkedin")) {
    return "You can find my LinkedIn in the Socials section or right here: https://linkedin.com/kresnandityoms";
  }
  if (input.includes("github")) {
    return "You can visit my GitHub through the Socials section or here: https://github.com/";
  }

  // Personal Introduction
  if (input.includes("name") || input.includes("who are you") || input.includes("kresnandityo") || input.includes("mahesa")) {
    return "I'm Kresnandityo Mahesa Suryo, but you can call me Kresna!";
  }
  if (input.includes("about you") || input.includes("who is kresna") || input.includes("tell me") || input.includes("who is")) {
    return "I'm an AI enthusiast, software developer, and explorer passionate about technology and personal growth.";
  }

  if (input.includes("hi")) {
    return "Hi there! 👋 How can I assist you today?";
  }

  // Catch-all
  return "I'm not sure how to answer that yet. Try asking about my skills, projects, education, or contact details.";
}


const toggleBtn = document.getElementById("chat-toggle");
const chatBox = document.getElementById("chat-container");

toggleBtn.addEventListener("click", () => {
  chatBox.classList.toggle("active");

  if (chatBox.classList.contains("active")) {
    chatBox.classList.remove("hidden");
  } else {
    chatBox.classList.add("hidden");
  }
});

document.getElementById("chat-close").addEventListener("click", () => {
  chatBox.classList.remove("active");
});

//Projects section
let currentSlide = 0;

let slideIndex = 1;

window.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const slides = document.querySelectorAll(".project-slide");
  const totalSlides = slides.length;

  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[totalSlides - 1].cloneNode(true);
  firstClone.id = "first-clone";
  lastClone.id = "last-clone";

  track.appendChild(firstClone);
  track.insertBefore(lastClone, slides[0]);

  const allSlides = document.querySelectorAll(".project-slide");
  const slideWidth = slides[0].clientWidth + 32; // +gap (2rem = 32px)
  track.style.transform = `translateX(-${slideWidth * slideIndex}px)`;

  track.addEventListener("transitionend", () => {
    const currentSlides = document.querySelectorAll(".project-slide");
    if (currentSlides[slideIndex].id === "first-clone") {
      track.style.transition = "none";
      slideIndex = 1;
      track.style.transform = `translateX(-${slideWidth * slideIndex}px)`;
    }
    if (currentSlides[slideIndex].id === "last-clone") {
      track.style.transition = "none";
      slideIndex = totalSlides;
      track.style.transform = `translateX(-${slideWidth * slideIndex}px)`;
    }
  });

  window.moveSlide = (direction) => {
    const currentSlides = document.querySelectorAll(".project-slide");
    if (slideIndex >= currentSlides.length - 1 && direction === 1) return;
    if (slideIndex <= 0 && direction === -1) return;
    slideIndex += direction;
    track.style.transition = "transform 0.5s ease";
    track.style.transform = `translateX(-${slideWidth * slideIndex}px)`;
  };
});

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") moveSlide(-1);
  if (e.key === "ArrowRight") moveSlide(1);
});

// FLOATING LIGHTS ANIMATION
function getRandomOffset() {
  const x = Math.random() * 200 - 100; // -100vw to +100vw
  const y = Math.random() * 200 - 100; // -100vh to +100vh
  return `translate(${x}vw, ${y}vh)`;
}

function animateLight(light) {
  const keyframes = [
    { transform: "translate(0, 0)" },
    { transform: getRandomOffset() },
    { transform: getRandomOffset() },
    { transform: getRandomOffset() },
    { transform: "translate(0, 0)" }
  ];

  const options = {
    duration: 20000,
    iterations: Infinity,
    easing: "ease-in-out"
  };

  light.animate(keyframes, options);
}

window.addEventListener("DOMContentLoaded", () => {
  const light1 = document.getElementById("light1");
  const light2 = document.getElementById("light2");

  if (light1 && light2) {
    animateLight(light1);
    animateLight(light2);
  }
});
