import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { applyAfterRender, configure, markdownToOutput } from 'shahneshan';
// import ReactMarkdown from 'react-markdown';

const MarkdownLoader = ({ template: Template }) => {
    const [content, setContent] = useState('');
    const [sidebar, setSidebar] = useState('');
    const location = useLocation();
    const outputRef = useRef(null);
    
    // Construct the Markdown file path
    const filePath = (location.pathname && location.pathname != "/") ? `/docs/${location.pathname}.md` : '/docs/README.md';
    

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
                if(markdown) setSidebar(markdown);
            })
            .catch((err) =>{console.log("???????");});
    }, []);


    // After content is updated, run the afterRender hook
    useEffect(() => {
        if (outputRef.current) {
        applyAfterRender(outputRef.current);
        }
    }, [content]);

    return (
        <Template sidebar={sidebar}>
            <div ref={outputRef} dangerouslySetInnerHTML={{__html: content}} />
        </Template>
    );
};

export default MarkdownLoader;

