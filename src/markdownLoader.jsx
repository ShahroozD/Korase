import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { applyAfterRender, configure, markdownToOutput } from 'shahneshan';
import { cleanMarkdown } from './utils/cleanup';

// import ReactMarkdown from 'react-markdown';

const MarkdownLoader = ({ template: Template }) => {
    const [content, setContent] = useState('');
    const [sidebar, setSidebar] = useState('');
    const [navbar, setNavbar] = useState('');
    const location = useLocation();
    const outputRef = useRef(null);
    
    // Extracting the path before the last "/"
    const path = location.pathname;
    const pathBeforeLast = path.substring(0, path.lastIndexOf("/"));

    // Construct the Markdown file path
    const filePath =
    location.pathname && location.pathname !== "/"
      ? `/docs/${location.pathname.endsWith(".md") ? location.pathname : location.pathname + ".md"}`
      : "/docs/README.md";


    // Define the sidebar file path dynamically
    const sidebarFilePath =
    location.pathname && location.pathname !== "/"
        ? `/docs${pathBeforeLast}/_sidebar.md`
        : "/docs/_sidebar.md";

    // Define the sidebar file path dynamically
    const navbarFilePath =
    location.pathname && location.pathname !== "/"
        ? `/docs${pathBeforeLast}/_navbar.md`
        : "/docs/_navbar.md";
    

    useEffect(() => {
        // Load the Markdown file content dynamically
        fetch(filePath)
            .then((response) => {               
                if (!response.ok) throw new Error('File not found');
                return response.text();
            })
            .then((markdown)=>{               

                configure({
                    customStyles: ``,
                    plugins: [] // Register plugins here
                });
                
                const htmlContent = markdownToOutput(markdown);
                setContent(htmlContent);
            })
            .catch((err) => setContent(`# Error: Could not load ${filePath}\n\n${err.message}`));
    }, [filePath]);

    useEffect(() => {
        // Load the Markdown file content dynamically
        fetch(`/docs/_sidebar.md`)
            .then((response) => {               
                return response.text();
            })
            .then((markdown)=>{               
                if (markdown && !(markdown.startsWith("<!DOCTYPE html>") || markdown.includes("<html"))){
                    const cleanedContent = cleanMarkdown(markdown);
                    setSidebar(cleanedContent);
                }
            })
            .catch((err) =>{console.log("???????");});
    }, [sidebarFilePath]);

    useEffect(() => {
        // Load the Markdown file content dynamically
        fetch(navbarFilePath)
            .then((response) => {
                return response.text();
            })
            .then((markdown) => {
                if (markdown && !(markdown.startsWith("<!DOCTYPE html>") || markdown.includes("<html"))){
                    const cleanedContent = cleanMarkdown(markdown);
                    setNavbar(cleanedContent);
                }
            })
            .catch((err) => {
                console.log("Error loading sidebar:", err);
            });
    }, [navbarFilePath]);

    // After content is updated, run the afterRender hook
    useEffect(() => {
        if (outputRef.current) {
        applyAfterRender(outputRef.current);
        }
    }, [content]);

    return (
        <Template sidebar={sidebar} navbar={navbar}>
            <div ref={outputRef} dangerouslySetInnerHTML={{__html: content}} />
        </Template>
    );
};

export default MarkdownLoader;

