import { configure, markdownToOutput } from 'shahneshan';
import path from "path";
import fs from "fs";
import fsPromises from "fs/promises";
import React from "react";
import { fileURLToPath } from "url";
import ReactDOMServer from "react-dom/server";
import parse from "html-react-parser";
import layout from './utils/render/layout';
import BlogTemplate from '../templates/BlogTemplate/index';
import sidebar from './../docs/_sidebar.md';


const __dirname = path.dirname(fileURLToPath(import.meta.url)); // Define __dirname manually (for ES modules)
const docsDir = path.join(__dirname, '../docs'); // Path to docs folder
const publicDir = path.join(__dirname, '../public'); // Path to public folder

async function loadMarkdown(filePath) {
    try {
        // Read the markdown file asynchronously
        const markdown = await fsPromises.readFile(filePath, 'utf8');
        configure({
            customStyles: ``,
            plugins: [] // Register plugins here
        });
        // Convert markdown to HTML
        const htmlContent = markdownToOutput(markdown);

        return htmlContent;
    } catch (err) {
        console.error('Error reading file:', err);
        return "";
    }
}

// Function to recursively get all .md file paths
const getAllMarkdownFiles = (dir) => {
    let files = [];
    
    fs.readdirSync(dir, { withFileTypes: true }).forEach((file) => {
        const fullPath = path.join(dir, file.name);

        if (file.isDirectory()) {
            files = files.concat(getAllMarkdownFiles(fullPath)); // Recursive call for subdirectories
        } else if (file.name.endsWith('.md') && !file.name.startsWith("_")) {
            files.push(fullPath); // Add markdown file path
        }
    });

    return files;
};

// Read files one by one (sequentially)
const processMarkdownFiles = async () => {
    const markdownFiles = await getAllMarkdownFiles(docsDir);

    for (const filePath of markdownFiles) {
        
        const htmlString = await loadMarkdown(filePath);
        const html = ReactDOMServer.renderToStaticMarkup(<BlogTemplate sidebar={sidebar}>{parse(htmlString)}</BlogTemplate>);
        const fullHtml = layout('kashkul', html) ;

        const fileName =  (filePath.split(docsDir)[1] == "/README.md")?'/index.html':filePath.split(docsDir)[1].replace(/\.md$/, '/index.html');

        const renderpath = path.join(publicDir, fileName);
        console.log(`render to: public${fileName}`);
        
        // Ensure the directory exists
        await fsPromises.mkdir(path.dirname(renderpath), { recursive: true });

        // Save the HTML file
        await fsPromises.writeFile(renderpath, fullHtml, 'utf-8');
    }

    console.log("✅ HTML saved");
};

// Call the async function
processMarkdownFiles();

