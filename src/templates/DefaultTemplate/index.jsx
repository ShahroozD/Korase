import React from 'react';
import './styles.css';

const BlogTemplate = ({ children }) => (
    <div className="default-template">
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="PERSIAN">فارسی</a></li>
            </ul>
        </nav>
        <div className="content">{children}</div>
        <footer>Stay Connected</footer>
    </div>
);

export default BlogTemplate;
