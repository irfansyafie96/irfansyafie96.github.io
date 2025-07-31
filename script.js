document.addEventListener("DOMContentLoaded", function () {
  // ===== Theme Management =====
  const body = document.body;
  const themeToggle = document.createElement("button");
  themeToggle.className = "theme-toggle";
  themeToggle.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1-8.313-12.454z"/>
    </svg>
  `;
  body.appendChild(themeToggle);
  // Theme toggle functionality
  themeToggle.addEventListener("click", function () {
    body.classList.toggle("light-mode");
    localStorage.setItem("darkMode", body.classList.contains("dark-mode"));
  });
  // Load saved theme preference
  if (localStorage.getItem("darkMode") !== "false") {
    body.classList.add("dark-mode");
  }
  // ===== Mobile Navigation =====
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (menuToggle && navLinks) {
    // Toggle mobile menu
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
    // Close mobile menu when a link is clicked
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });
  }
  // ===== Project Modal =====
  const modal = document.getElementById("projectModal");
  const modalContent = document.getElementById("modalContent");
  // Project data configuration
  const projectData = {
    "ai-tutor": {
      title: "AI-Powered Tutoring System",
      description:
        "A full-stack quiz generator with AI-powered features. Users can upload notes, generate quizzes from the content and review their performance. The system is designed to provide a personalized learning experience.",
      technologies: "React, Node.js, Express, PostgreSQL, OpenAI API",
      github: "https://github.com/irfansyafie96/ai-powered-tutoring-system",
      liveDemo: "#",
    },
    "food-ordering": {
      title: "Food Ordering System",
      description:
        "A collaborative, full-stack food ordering web application designed to streamline the process of online food orders and real-time staff management. It supports customer orders, staff management, order tracking, and email notifications — all powered by a PHP backend and MySQL database.",
      technologies: "PHP, MySQL, HTML/CSS, JavaScript, PHPMailer",
      github: "https://github.com/irfansyafie96/food_ordering_system",
      liveDemo: "#",
    },
  };
  // Modal open function
  function openModal(projectId) {
    const project = projectData[projectId];
    if (!project) return;
    modalContent.innerHTML = `
      <div class="modal-header">
        <h3>${project.title}</h3>
        <button class="close-btn" aria-label="Close modal">&times;</button>
      </div>
      <div class="modal-body">
        <p>${project.description}</p>
        <p><strong>Technologies used:</strong> ${project.technologies}</p>
      </div>
      <div class="modal-footer">
        ${
          project.liveDemo !== "#"
            ? `<a href="${project.liveDemo}" class="modal-link primary" target="_blank" rel="noopener noreferrer">
               <i class="fas fa-external-link-alt"></i> Live Demo
             </a>`
            : ""
        }
        <a href="${project.github}" 
           class="modal-link secondary" 
           target="_blank" 
           rel="noopener noreferrer">
          <i class="fab fa-github"></i> GitHub Repo
        </a>
      </div>
    `;
    modal.classList.add("modal-open");
  }
  // Modal close function
  function closeModal() {
    modal.classList.remove("modal-open");
  }
  // Modal event listeners
  modal.addEventListener("click", function (event) {
    if (event.target.matches(".close-btn")) {
      closeModal();
    }
  });
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });
  // Add click listeners to project buttons
  document.querySelectorAll(".view-details-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const projectId = this.getAttribute("data-project-id");
      openModal(projectId);
    });
  });

  // ===== Section Navigation Arrows =====
  function setupSectionArrows(
    sectionId,
    containerSelector,
    cardSelector,
    minItemsForArrows = 4
  ) {
    const section = document.getElementById(sectionId);

    if (!section) return;

    const container = section.querySelector(containerSelector);

    if (!container) return;

    // Create arrow buttons
    const leftArrow = document.createElement("button");
    leftArrow.className = "section-arrow left";
    leftArrow.innerHTML = '<i class="fas fa-chevron-left"></i>';
    leftArrow.setAttribute("aria-label", "Previous items");

    const rightArrow = document.createElement("button");
    rightArrow.className = "section-arrow right";
    rightArrow.innerHTML = '<i class="fas fa-chevron-right"></i>';
    rightArrow.setAttribute("aria-label", "Next items");

    // Append arrows to the section
    section.appendChild(leftArrow);
    section.appendChild(rightArrow);

    // Add a class to the section to identify it as having arrows
    section.classList.add("scrollable-container");

    // Function to check if the container is scrollable
    function checkScroll() {
      const cards = container.querySelectorAll(cardSelector);
      const cardCount = cards.length;

      // Only show arrows and make scrollable if we have more than minItemsForArrows
      if (cardCount > minItemsForArrows) {
        container.classList.add("scrollable");
      } else {
        container.classList.remove("scrollable");
      }
    }

    // Initial check
    checkScroll();

    // Check on window resize
    window.addEventListener("resize", checkScroll);

    // Scroll functions
    leftArrow.addEventListener("click", () => {
      container.scrollBy({
        left: -320, // Adjust based on card width + gap
        behavior: "smooth",
      });
    });

    rightArrow.addEventListener("click", () => {
      container.scrollBy({
        left: 320, // Adjust based on card width + gap
        behavior: "smooth",
      });
    });
  }

  // Setup arrows for projects section (show arrows only if more than 3 projects)
  setupSectionArrows("projects", ".projects-container", ".project-item", 3);

  // Setup arrows for experience section (show arrows only if more than 3 experiences)
  setupSectionArrows(
    "experience",
    ".experience-container",
    ".experience-card",
    3
  );

  // ===== Dynamic Copyright Year =====
  const copyright = document.getElementById("copyright");
  if (copyright) {
    copyright.innerHTML = `&copy; ${new Date().getFullYear()} Irfan Syafie Nor Afian. All rights reserved.`;
  }
});
