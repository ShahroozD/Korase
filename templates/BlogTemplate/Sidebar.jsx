import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

// Function to parse the input text
function parseLinksToObjects(text) {
    const regex = /\[([^\]]+)\]\(([^)]*)\)/g;
    let matches;
    const result = [];

    while ((matches = regex.exec(text)) !== null) {
        const label = matches[1];
        const path = matches[2];
        result.push({ path: path, label: label });
    }

    return result;
}

const Sidebar = (sidebar) => {

    const docsList = useMemo(() => parseLinksToObjects(sidebar.sidebar || ""), [sidebar]);

    return (
        <div className="sidebar">
            <div className="container">
                <h2>Documentation</h2>
                <ul>
                    {docsList.map((doc, index) => (
                        <li key={index}>
                            <Link to={`/${doc.path}`}>{doc.label}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
