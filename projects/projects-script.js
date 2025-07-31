document.addEventListener("DOMContentLoaded", function () {
  // Get all "Read More" buttons
  const readMoreButtons = document.querySelectorAll(".read-more-btn");

  // Add click event listener to each button
  readMoreButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Get the project ID from the data attribute
      const projectId = this.getAttribute("data-project-id");

      // Navigate to the project detail page with the project ID as a URL parameter
      window.location.href = `project-detail.html?id=${projectId}`;
    });
  });
});
