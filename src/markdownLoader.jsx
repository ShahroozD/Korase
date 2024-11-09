import React, { useEffect, useState } from 'react';
import { redirect, useParams } from 'react-router-dom';
import { configure, markdownToOutput } from 'shahmark';
// import ReactMarkdown from 'react-markdown';

const MarkdownLoader = ({ template: Template }) => {
    const [content, setContent] = useState('');
    const { path } = useParams();
    
    // Construct the Markdown file path
    const filePath = path ? `/docs/${path}.md` : '/docs/README.md';
    

    useEffect(() => {
        // Load the Markdown file content dynamically
        fetch(filePath)
            .then((response) => {               
                if (!response.ok) throw new Error('File not found');
                return response.text();
            })
            .then((markdown)=>{               

                // markdownParser.configure({
                //     customStyles: ``,
                //     plugins: [] // Register plugins here
                //   });
                
                const htmlContent = markdownToOutput(markdown);
                setContent(htmlContent);
            })
            .catch((err) => setContent(`# Error: Could not load ${filePath}\n\n${err.message}`));
    }, [filePath]);

    return (
        <Template>
            <div dangerouslySetInnerHTML={{__html: content}} />
        </Template>
    );
};

export default MarkdownLoader;
