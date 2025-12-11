module.exports = function(eleventyConfig) {
  // Copy the `styles` directory to the output
  eleventyConfig.addPassthroughCopy("styles");
  
  // Copy the `assets` directory to the output
  eleventyConfig.addPassthroughCopy("assets");
  
  // Copy the `main.js` file to the output
  eleventyConfig.addPassthroughCopy("main.js");

  // Add date filter
  eleventyConfig.addFilter("date", function(dateVal, format) {
    const date = new Date(dateVal);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    // We will ignore the 'format' string for now and return the requested "Friday, 10 October 2025" style
    // to keep it simple and dependency-free.
    return date.toLocaleDateString('en-GB', options);
  });

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes"
    }
  };
};
