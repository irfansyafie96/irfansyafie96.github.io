module.exports = function (eleventyConfig) {
  // Copy the `styles` directory to the output
  eleventyConfig.addPassthroughCopy("styles");

  // Copy the `assets` directory to the output
  eleventyConfig.addPassthroughCopy("assets");

  // Copy the `main.js` file to the output
  eleventyConfig.addPassthroughCopy("main.js");

  // Add date filter
  eleventyConfig.addFilter("date", function (dateVal, format) {
    const date = new Date(dateVal);

    if (format === "dd/MM/yyyy") {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }

    // Default format: "Friday, 10 October 2025"
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-GB", options);
  });

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
    },
  };
};
