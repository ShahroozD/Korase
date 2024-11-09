import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [docsList, setDocsList] = useState([]);

    // Simulate fetching the list of files (replace this with dynamic fetching if you have a backend)
    useEffect(() => {
        const docs = [
            { path: '', label: 'Home' },
            { path: 'PERSIAN', label: 'فارسی' },
        ];
        setDocsList(docs);
    }, []);

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
