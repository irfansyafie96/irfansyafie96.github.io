// Load navigation bar on every page
fetch("/components/navbar.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("navBarContainer").innerHTML = data;
  });

// Load blog posts on blog page
document.addEventListener("DOMContentLoaded", function () {
  // Check if inside the blog page
  if (document.getElementById("blogPostsContainer")) {
    // Fetch blog posts data
    fetch("/data/blog-posts.json")
      .then((response) => response.json())
      .then((data) => {
        const container = document.getElementById("blogPostsContainer");

        // Create HTML for each blog posts
        let blog = '<div class="blogPostsList">';

        data.forEach((post) => {
          blog += `
          <a href="${post.file}" class="blogPostsFile">
            <h2>${post.title}</h2>
            <p class="blogPostsDate">${post.date}</p>
            <p>${post.excerpt}</p>
          </a>
          `;
        });

        blog += "</div>";
        container.innerHTML = blog;
      })
      .catch((error) => {
        console.error("Error reading blog posts: ", error);
        document.getElementById("blogPostsContainer").innerHTML =
          "<p>Failed to load blog posts.</p>";
      });
  }
});
