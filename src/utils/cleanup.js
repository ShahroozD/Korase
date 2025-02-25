export const cleanMarkdown = (mdContent) => {
    return mdContent.replace(/\.md/g, ""); // Remove .md from all links
};

const processMarkdownLinks = (markdown) => {
    return markdown.replace(/\[([^\]]+)\]\((\/[^\)"]*)\)/g, (match, text, path) => {
      let newPath = path;
      
      if (newPath.endsWith(".md")) {
        newPath = newPath.replace(/\.md$/, ""); // Remove .md
      } else {
        newPath = newPath.replace(/\/$/, "") + "/README.md"; // Append /README.md
      }
  
      return `[${text}](${newPath})`; // Return modified markdown link
    });
  };
  