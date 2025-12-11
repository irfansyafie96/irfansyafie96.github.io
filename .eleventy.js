module.exports = function(eleventyConfig) {
  // Copy the `styles` directory to the output
  eleventyConfig.addPassthroughCopy("styles");
  
  // Copy the `assets` directory to the output
  eleventyConfig.addPassthroughCopy("assets");
  
  // Copy the `data` directory to the output
  eleventyConfig.addPassthroughCopy("data");
  
  // Copy the `main.js` file to the output
  eleventyConfig.addPassthroughCopy("main.js");

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes"
    }
  };
};
