import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

const isNode = typeof window === 'undefined';

// Function to parse the input text
function parseLinksToObjects(text) {
    const regex = /\[([^\]]+)\]\(([^)]*)\)/g;
    let matches;
    const result = [];

    while ((matches = regex.exec(text)) !== null) {
        result.push({ path: matches[2], label: matches[1] });
    }
    return result;
}

const Sidebar = ({ sidebar = "" }) => {
    const docsList = useMemo(() => parseLinksToObjects(sidebar), [sidebar]);

    return (
        <div className="sidebar">
            <div className="container">
                <h2>Documentation</h2>
                <ul>
                    {docsList.map((doc, index) => (
                        <li key={index}>
                            {isNode ? (
                                <a href={`/${doc.path}`}>{doc.label}</a>
                            ) : (
                                <Link to={`/${doc.path}`}>{doc.label}</Link>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
