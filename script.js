// Robust dark-mode-first script
(function () {
  // Immediately set default theme (works even if script is in <head>)
  const savedTheme = localStorage.getItem("theme");
  // If savedTheme is absent, default to dark
  const defaultToDark = savedTheme === null ? true : savedTheme === "dark";

  // Apply quickly to avoid FOUC: use documentElement (always present)
  if (defaultToDark) {
    document.documentElement.classList.add("dark-mode");
    // also store default so subsequent loads are consistent
    if (savedTheme === null) localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark-mode");
  }

  // Helper: safe lucide creation
  function safeCreateLucideIcons() {
    try {
      if (window.lucide && typeof lucide.createIcons === "function") {
        lucide.createIcons();
      }
    } catch (err) {
      // keep silent but helpful in console
      console.warn("lucide.createIcons() error:", err);
    }
  }

  // Once DOM is ready, wire everything (toggle, chat, carousel, etc)
  window.addEventListener("DOMContentLoaded", () => {
    // Query elements now that DOM exists
    const toggle = document.getElementById("dark-mode-toggle");
    const body = document.body || document.documentElement;
    // Ensure body variable always valid
    if (!body) {
      console.error("Unable to find <body> or documentElement to apply theme.");
    }

    // Small helper to update icon + persist
    function setToggleIcon(isDark) {
      if (!toggle) return;
      toggle.innerHTML = "";
      const iconEl = document.createElement("i");
      iconEl.setAttribute("data-lucide", isDark ? "sun" : "moon");
      toggle.appendChild(iconEl);
      safeCreateLucideIcons();
    }

    function applyTheme(isDark, persist = true) {
      if (!body) return;
      if (isDark) {
        body.classList.add("dark-mode");
      } else {
        body.classList.remove("dark-mode");
      }
      setToggleIcon(isDark);
      if (persist) localStorage.setItem("theme", isDark ? "dark" : "light");
    }

    // Initialize the toggle icon based on currently applied class or localStorage
    const nowSaved = localStorage.getItem("theme");
    const isDarkNow = nowSaved ? nowSaved === "dark" : document.documentElement.classList.contains("dark-mode");
    setToggleIcon(isDarkNow);

    // Attach click handler if toggle exists
    if (toggle) {
      toggle.addEventListener("click", () => {
        const currentlyDark = (body && body.classList.contains("dark-mode")) || document.documentElement.classList.contains("dark-mode");
        applyTheme(!currentlyDark, true);
      });
    } else {
      // Not fatal — but notify so you can debug missing markup
      console.info("No #dark-mode-toggle element found. Theme will still be applied by default.");
    }

    // --- The rest of your initialization (chat, carousel, lights) ---
    // Chat init
    const chatLog = document.getElementById("chat-log");
    const chatInput = document.getElementById("chat-input");
    const sendBtn = document.getElementById("send-btn");

    if (sendBtn) sendBtn.addEventListener("click", handleUserInput);
    if (chatInput) {
      chatInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") handleUserInput();
      });
    }

    // attach chat helper functions to this scope
    function appendMessage(sender, text) {
      if (!chatLog) return;
      const msg = document.createElement("div");
      msg.className = `message ${sender}`;
      msg.textContent = text;
      chatLog.appendChild(msg);
      chatLog.scrollTop = chatLog.scrollHeight;
    }

    function handleUserInput() {
      if (!chatInput) return;
      const input = chatInput.value.trim();
      if (!input) return;
      appendMessage("user", input);
      chatInput.value = "";
      const response = getAIResponse(input.toLowerCase());
      appendMessage("bot", response);
    }

    // (Re-use your rule-based responses)
    function getAIResponse(input) {
      if (!input) return "Please type something.";
      if (input.includes("hello") || input.includes("hey") || input.includes("helo")) return "Hi there! 👋 How can I assist you today?";
      if (input.includes("skills") || input.includes("technologies") || input.includes("skill")) return "I have experience with Web and Software developing as well as AI engineering and more!";
      if (input.includes("programming languages") || input.includes("coding languages")) return "I'm familiar with Java, JavaScript, Python, and some SQL.";
      if (input.includes("education") || input.includes("study")) return "I'm currently pursuing my studies in Informatics with a concentration in Artificial Intelligence at President University.";
      if (input.includes("projects") || input.includes("portfolio") || input.includes("project")) return "You can explore my projects in the Projects section. I’ve worked on things like Face Recognition Attendance Systems and interactive websites.";
      if (input.includes("contact") || input.includes("reach you")) return "You can contact me via the Contact section below or directly to kmsuryo@gmail.com. I'd love to connect!";
      if (input.includes("ai") || input.includes("artificial intelligence")) return "AI is my main passion! I'm exploring how it can enhance software, solve problems, and improve human experiences.";
      if (input.includes("chatbot") || input.includes("this bot") || input.includes("what is this")) return "This chatbot is a simple rule-based system I built to answer common questions about me!";
      if (input.includes("name") || input.includes("who are you") || input.includes("kresnandityo") || input.includes("mahesa")) return "I'm Kresnandityo Mahesa Suryo, but you can call me Kresna!";
      if (input.includes("hi")) return "Hi there! 👋 How can I assist you today?";
      return "I'm not sure how to answer that yet. Try asking about my skills, projects, education, or contact details.";
    }

    // Chat UI toggles
    const toggleBtn = document.getElementById("chat-toggle");
    const chatBox = document.getElementById("chat-container");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        if (!chatBox) return;
        chatBox.classList.toggle("active");
        chatBox.classList.toggle("hidden");
      });
    }
    const chatCloseBtn = document.getElementById("chat-close");
    if (chatCloseBtn && chatBox) {
      chatCloseBtn.addEventListener("click", () => {
        chatBox.classList.remove("active");
      });
    }

    // Projects carousel (initialize if elements present)
    const track = document.querySelector(".carousel-track");
    const slides = document.querySelectorAll(".project-slide");
    if (track && slides.length > 0) {
      let slideIndex = 1;
      const totalSlides = slides.length;
      const firstClone = slides[0].cloneNode(true);
      const lastClone = slides[totalSlides - 1].cloneNode(true);
      firstClone.id = "first-clone";
      lastClone.id = "last-clone";
      track.appendChild(firstClone);
      track.insertBefore(lastClone, slides[0]);
      const slideWidth = slides[0].clientWidth + 32;
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
    }

    // Floating lights
    const light1 = document.getElementById("light1");
    const light2 = document.getElementById("light2");
    function getRandomOffset() {
      const x = Math.random() * 200 - 100;
      const y = Math.random() * 200 - 100;
      return `translate(${x}vw, ${y}vh)`;
    }
    function animateLight(light) {
      const keyframes = [
        { transform: "translate(0, 0)" },
        { transform: getRandomOffset() },
        { transform: getRandomOffset() },
        { transform: getRandomOffset() },
        { transform: "translate(0, 0)" },
      ];
      const options = { duration: 20000, iterations: Infinity, easing: "ease-in-out" };
      light.animate(keyframes, options);
    }
    if (light1 && light2) {
      animateLight(light1);
      animateLight(light2);
    }

    // ensure keyboard handlers for slides
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft" && typeof window.moveSlide === "function") window.moveSlide(-1);
      if (e.key === "ArrowRight" && typeof window.moveSlide === "function") window.moveSlide(1);
    });

    // final lucide call for any icons that were added/created
    safeCreateLucideIcons();
  }); // DOMContentLoaded
})();
