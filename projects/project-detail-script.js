document.addEventListener("DOMContentLoaded", function () {
  // Get project ID from URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get("id");

  if (projectId) {
    // Load project data from JSON file
    fetch("../data/projects.json")
      .then((response) => response.json())
      .then((data) => {
        // Find the project with the matching ID
        const project = data.projects.find((p) => p.id === projectId);

        if (project) {
          // Populate the page with project data
          populateProjectDetail(project);
          // Setup image gallery functionality
          setupImageGallery(project.images.gallery);
          // Load related projects
          loadRelatedProjects(data.projects, project.relatedProjects);
        } else {
          // Handle project not found
          showProjectNotFound();
        }
      })
      .catch((error) => {
        console.error("Error loading project data:", error);
        showDataLoadError();
      });
  } else {
    // Handle missing project ID
    showMissingProjectId();
  }
});

function populateProjectDetail(project) {
  console.log("Populating project detail for:", project.title); // Debug log

  // Update breadcrumb
  document.getElementById("project-title-breadcrumb").textContent =
    project.title;

  // Update title
  document.getElementById("project-title").textContent = project.title;

  // Update meta information
  document.getElementById("project-date").textContent = project.date;
  document.getElementById("project-tech").textContent =
    project.technologies.join(", ");

  // Update main image
  const mainImage = document.getElementById("project-main-image");
  const mainImagePath = `../images/${project.images.main}`;
  console.log("Setting main image to:", mainImagePath); // Debug log
  mainImage.src = mainImagePath;
  mainImage.alt = project.title;

  // Add error handling for main image
  mainImage.onerror = function () {
    console.error("Failed to load main image:", mainImagePath);
    this.src = "../images/placeholder.jpg"; // Fallback to a placeholder image
  };

  // Update overview
  document.getElementById("project-overview").textContent = project.overview;

  // Update features
  const featuresList = document.getElementById("project-features");
  featuresList.innerHTML = "";
  project.features.forEach((feature) => {
    const li = document.createElement("li");
    li.textContent = feature;
    featuresList.appendChild(li);
  });

  // Update technical implementation
  document.getElementById("project-technical").textContent = project.technical;

  // Update challenges
  document.getElementById("project-challenges").textContent =
    project.challenges;

  // Update links section - conditionally show live demo button
  const linksContainer = document.querySelector(".project-links");
  linksContainer.innerHTML = ""; // Clear existing links

  // Add Live Demo button only if there's a valid URL (not "#")
  if (project.links.liveDemo && project.links.liveDemo !== "#") {
    const liveDemoLink = document.createElement("a");
    liveDemoLink.href = project.links.liveDemo;
    liveDemoLink.className = "project-link primary";
    liveDemoLink.target = "_blank";
    liveDemoLink.rel = "noopener noreferrer";
    liveDemoLink.innerHTML =
      '<i class="fas fa-external-link-alt"></i> Live Demo';
    linksContainer.appendChild(liveDemoLink);
  }

  // Always add GitHub button
  const githubLink = document.createElement("a");
  githubLink.href = project.links.github;
  githubLink.className = "project-link secondary";
  githubLink.target = "_blank";
  githubLink.rel = "noopener noreferrer";
  githubLink.innerHTML = '<i class="fab fa-github"></i> GitHub Repository';
  linksContainer.appendChild(githubLink);
}

function setupImageGallery(images) {
  const thumbnailGallery = document.getElementById("thumbnail-gallery");
  const mainImage = document.getElementById("project-main-image");

  // Clear existing thumbnails
  thumbnailGallery.innerHTML = "";

  // Create thumbnails for each image
  images.forEach((image, index) => {
    const img = document.createElement("img");
    img.src = `../images/${image}`;
    img.alt = `Project image ${index + 1}`;

    // Set the first image as active
    if (index === 0) {
      img.classList.add("active");
    }

    // Add click event to change main image
    img.addEventListener("click", function () {
      // Update main image
      mainImage.src = this.src;

      // Update active thumbnail
      document.querySelectorAll(".thumbnail-gallery img").forEach((thumb) => {
        thumb.classList.remove("active");
      });
      this.classList.add("active");
    });

    thumbnailGallery.appendChild(img);
  });
}

function loadRelatedProjects(allProjects, relatedProjectIds) {
  const relatedProjectsGrid = document.getElementById("related-projects-grid");

  // Clear existing related projects
  relatedProjectsGrid.innerHTML = "";

  // Find and display related projects
  relatedProjectIds.forEach((id) => {
    const project = allProjects.find((p) => p.id === id);

    if (project) {
      const card = document.createElement("div");
      card.className = "related-project-card";

      card.innerHTML = `
        <div class="related-project-image">
          <img src="../images/${project.images.thumbnail}" alt="${project.title}">
        </div>
        <div class="related-project-info">
          <h3>${project.title}</h3>
          <p>${project.brief}</p>
          <a href="project-detail.html?id=${project.id}" class="related-project-link">
            View Project <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      `;

      relatedProjectsGrid.appendChild(card);
    }
  });
}

function showProjectNotFound() {
  const container = document.querySelector(".project-detail-main");
  container.innerHTML = `
    <div class="container">
      <div class="error-message">
        <h1>Project Not Found</h1>
        <p>The requested project could not be found.</p>
        <a href="projects.html" class="project-link primary">Back to Projects</a>
      </div>
    </div>
  `;
}

function showDataLoadError() {
  const container = document.querySelector(".project-detail-main");
  container.innerHTML = `
    <div class="container">
      <div class="error-message">
        <h1>Error Loading Project</h1>
        <p>There was an error loading the project data. Please try again later.</p>
        <a href="projects.html" class="project-link primary">Back to Projects</a>
      </div>
    </div>
  `;
}

function showMissingProjectId() {
  const container = document.querySelector(".project-detail-main");
  container.innerHTML = `
    <div class="container">
      <div class="error-message">
        <h1>No Project Specified</h1>
        <p>No project ID was provided.</p>
        <a href="projects.html" class="project-link primary">Back to Projects</a>
      </div>
    </div>
  `;
}
