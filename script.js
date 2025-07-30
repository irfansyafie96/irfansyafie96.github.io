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

  // ===== Dynamic Copyright Year =====
  const copyright = document.getElementById("copyright");
  if (copyright) {
    copyright.innerHTML = `&copy; ${new Date().getFullYear()} Irfan Syafie Nor Afian. All rights reserved.`;
  }
});
