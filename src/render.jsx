import { configure, markdownToOutput } from 'shahneshan';
import path from "path";
import fs from "fs";
import fsPromises from "fs/promises";
import React from "react";
import { fileURLToPath, pathToFileURL } from "url";
import ReactDOMServer from "react-dom/server";
import parse from "html-react-parser";
import layout from './utils/render/layout';
import { cleanMarkdown, findMenusData } from './utils/menuUtils';

const __dirname = path.dirname(fileURLToPath(import.meta.url)); // Define __dirname manually (for ES modules)

const TEMPLATE_NAME = import.meta.env.VITE_TEMPLATE_NAME || "BlogTemplate";

const templatePath = pathToFileURL(path.resolve(__dirname, `../dist/templates/${TEMPLATE_NAME}/index.mjs`)).href;
const BlogTemplate = (await eval('import(templatePath)')).default;

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

const loadDataBar = async (filePath) => {
    try {
        // Read the markdown file asynchronously
        const markdown = await fsPromises.readFile(filePath, 'utf8');
        return cleanMarkdown(markdown);
    } catch (err) {
        console.error('Error reading file:', err);
        return [];
    }
}

const copyStyles = async () => {
    const srcCssPath = path.join(__dirname, `../dist/templates/${TEMPLATE_NAME}/styles.css`);
    const destCssPath = path.join(publicDir, 'styles.css');

    try {
        await fsPromises.copyFile(srcCssPath, destCssPath);
        console.log('✅ styles.css copied to public folder');
    } catch (err) {
        console.error('❌ Error copying styles.css:', err);
    }
};

// Function to recursively get all .md file paths
const getAllMarkdownFiles = async (dir) => {
    let files = [];
    let sides = {};
    let navs = {};

    try {
        const items = await fsPromises.readdir(dir, { withFileTypes: true });

        for (const file of items) {
            const fullPath = path.join(dir, file.name);

            if (file.isDirectory()) {
                const { files: subFiles, sides: subSides } = await getAllMarkdownFiles(fullPath);
                files = files.concat(subFiles); // Merge normal files

                // Merge sides into the object
                Object.entries(subSides).forEach(([key, value]) => {
                    if (!sides[key]) sides[key] = [];
                    sides[key] = sides[key].concat(value);
                });
            } else if (file.name.endsWith(".md") && !file.name.startsWith("_")) {
                files.push(fullPath); // Add normal markdown file path
            } else if (file.name.endsWith(".md") && file.name.startsWith("_")) {
                let dirPath = path.dirname(fullPath).split(docsDir)[1]; // Get directory of the file
                if (!dirPath) dirPath = "/"; // If in root
                if(file.name.includes("sidebar")) sides[dirPath] = await loadDataBar(fullPath); 
                if(file.name.includes("navbar")) navs[dirPath] = await loadDataBar(fullPath);
                
            }
        }
    } catch (err) {
        console.error("Error reading directory:", err);
    }

    return { files, sides, navs };
};

// Read files one by one (sequentially)
const processMarkdownFiles = async () => {
    const markdowns = await getAllMarkdownFiles(docsDir);

    for (const filePath of markdowns.files) {
        
        const htmlString = await loadMarkdown(filePath);
        const currentPath = filePath.split(docsDir)[1];
        const isRoot = (currentPath == "/README.md");
        
        const sideBarData = await findMenusData(path.dirname(currentPath), markdowns.sides);
        const navBarData = await findMenusData(path.dirname(currentPath), markdowns.navs);
        
        const html = ReactDOMServer.renderToStaticMarkup(
            <BlogTemplate 
                sidebar={sideBarData} 
                navbar={navBarData} 
                path={(isRoot)?"/":currentPath}
            >
                {parse(htmlString)}
            </BlogTemplate>);

        // set all docs image source to public pics folder
        const cleanHtml = html.replace(/src="([^"]*\/pics\/)([^\/"]+\/)*([^\/"]+)"/g, 'src="/pics/$3"');

        const fullHtml = layout('korase', cleanHtml) ;

        const fileName =  (isRoot)?'/index.html':currentPath.replace(/\.md$/, '/index.html');

        const renderpath = path.join(publicDir, fileName);
        console.log(`render to: public${fileName}`);
        
        // Ensure the directory exists
        await fsPromises.mkdir(path.dirname(renderpath), { recursive: true });

        // Save the HTML file
        await fsPromises.writeFile(renderpath, fullHtml, 'utf-8');
    }

    console.log("✅ HTML saved");

    // Copy CSS after HTML is processed
    await copyStyles();
};

// Call the async function
processMarkdownFiles();

