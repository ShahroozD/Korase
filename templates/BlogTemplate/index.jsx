import React from 'react';
import './styles.css';
import Sidebar from './Sidebar';

const DefaultTemplate = ({ children, sidebar }) => (
    <div className='blog-template'>
        <Sidebar sidebar={sidebar} />
        <div className="markdown-container">
            <header>
                <h1>My Markdown Blog</h1>
            </header>
            <main>{children}</main>
            <footer>© 2024 My Blog</footer>
        </div>

    </div>
);

export default DefaultTemplate;
