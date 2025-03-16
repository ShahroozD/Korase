import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { applyAfterRender, configure, markdownToOutput } from 'shahneshan';
import { fetchMenus } from './utils/menuUtils';

const MarkdownLoader = ({ template: Template, plugins }) => {
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

    useLayoutEffect(() => {
        const loadSidebar = async () => {
            const markdown = await fetchMenus(`/docs${pathBeforeLast}`, "sidebar");
            if (markdown) {
                setSidebar(markdown);
            }
        };
        const loadNavbar = async () => {
            const markdown = await fetchMenus(`/docs${pathBeforeLast}`, "navbar");
            if (markdown) {
                setNavbar(markdown);
            }
        };

        loadSidebar();
        loadNavbar();
    }, [pathBeforeLast]);
    
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
                    plugins: plugins // Register plugins here
                });
                
                const htmlContent = markdownToOutput(markdown);
                setContent(htmlContent);
            })
            .catch((err) => setContent(`# Error: Could not load ${filePath}\n\n${err.message}`));
    }, [plugins, filePath]);

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

