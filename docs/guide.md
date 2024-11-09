
# Guide to Using This Blog

Welcome to the Markdown Blog! This guide will help you navigate and make the most out of the site. Here you’ll find information on how to explore content, switch languages, and understand the layout.

## Table of Contents

- [Introduction](#introduction)
- [Navigating the Sidebar](#navigating-the-sidebar)
- [Reading Content](#reading-content)
- [Switching Languages](#switching-languages)
- [Adding Your Own Content](#adding-your-own-content)

---

## Introduction

This blog is designed to make it easy to read Markdown files. The main focus is on documentation-style content that you can browse using the sidebar. Each document is accessible from the sidebar and displayed in the main content area.

## Navigating the Sidebar

The sidebar on the left side lists all available documents in this blog. Here’s how to navigate it:

1. **Click on any title** to open the corresponding Markdown document.
2. **Nested Folders**: If there are subfolders in the `docs` directory (e.g., `zh-cn` for localized content), they will appear as nested sections.
3. **Main Pages**: The main page (Home) is represented by `README.md` in the `docs` folder and can be accessed by clicking "Home."

## Reading Content

Each page is rendered from Markdown, allowing for easy reading. Markdown formatting helps display text clearly and allows for various elements, such as:

- **Headings** for sections.
- **Lists** for organizing information.
- **Links** to external or internal pages.

## Switching Languages

Some documents may have localized versions. For example, there is a folder named `zh-cn` with Chinese translations of certain pages. To view content in another language, navigate to the appropriate folder in the sidebar (e.g., `zh-cn/guide.md` for the Chinese version of this guide).

## Adding Your Own Content

Want to add a new page to the blog? Follow these simple steps:

1. **Add a Markdown file**: Place your file in the `docs` folder. For example, add `my-topic.md`.
2. **Access the Page**: The new page will be available at `/#/my-topic` in the blog.
3. **Update the Sidebar**: To add a link to the new page in the sidebar, update the `Sidebar.js` file with a link to the new document.

### Example of Adding a New File

1. Create `docs/tutorial.md`.
2. Add it to the sidebar by updating `Sidebar.js` with the following entry:


```javascript
   { path: 'tutorial', label: 'Tutorial' }
```

3. Now, you can access this page at `/#/tutorial`.

## Conclusion

This guide covers the basics of using this Markdown blog. Explore the sidebar to discover all available documents, and feel free to add new pages to the `docs` folder!

