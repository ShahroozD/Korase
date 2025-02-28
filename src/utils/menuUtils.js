export const cleanMarkdown = (mdContent) => {
    return mdContent.replace(/\.md/g, ""); // Remove .md from all links
};

// Define the sidebar file path dynamically
 export const fetchMenus = async (initialPath, name) => {
  let currentPath = initialPath;

  while (currentPath !== `/`) {
      try {
          const response = await fetch(`${currentPath}/_${name}.md`);
          
          // If successful, return the markdown text
          if (response.ok) {
              const markdown = await response.text();

              // Ensure it's a valid markdown file
              if (markdown && !(markdown.startsWith("<!DOCTYPE html>") || markdown.includes("<html"))) {
                  return cleanMarkdown(markdown);
              } 
          }
      } catch (error) {
          console.error("Fetch error:", error);
      }

      // Step back one level in the path
      const parts = currentPath.split("/").filter(Boolean);
      if (parts.length > 1) {
          parts.pop();
          currentPath = `/${parts.join("/")}`;
      } else {
          currentPath = `/`; // Fallback to root
      }
  }

  return null; // Return null if no valid file is found
};


export const findMenusData = async (initialPath, list) => {
  let currentPath = initialPath

  while (currentPath !== ``) {
    

    try {
        const markdown = list[`${currentPath}`];
        if (markdown) return markdown;
    } catch (error) {
        console.error("Fetch error:", error);
    }
    // Step back one level in the path
    const parts = currentPath.split("/").filter(Boolean);
    if (parts.length > 1) {
        parts.pop();
        currentPath = `/${parts.join("/")}`;
    } else {
        currentPath = `/`; // Fallback to root
    }
  }

  return null; // Return null if no valid file is found
};