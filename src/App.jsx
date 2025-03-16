import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RemoveTargetBlank from './utils/RemoveTargetBlank';
import MarkdownLoader from './markdownLoader';
import { getTemplate, loadPlugins } from './utils/getModuls';
// Importing templates


const App = () => {
    const [SelectedTemplate, setTemplate] = useState(null);
    const [plugins, setPlugins] = useState([]);

    useEffect(() => {
        loadPlugins().then((plugins) => {
            if (plugins) setPlugins(() => plugins);
            getTemplate().then((module) => {
                if (module) setTemplate(() => module);
            });
        });
    }, []);

    // If SelectedTemplate is not loaded yet, show a loading state
    if (!SelectedTemplate) {
        return <div>Loading Template...</div>;
    }

    const router = createBrowserRouter([
        {
          path: "/",
          element:<MarkdownLoader template={SelectedTemplate} plugins={plugins} />,
          children: [
            {
                path: "*",
                element:<MarkdownLoader template={SelectedTemplate} plugins={plugins} />,
            },
          ]
        },
    ]);

    return (
        <div className="app">
            <RemoveTargetBlank>
                <RouterProvider router={router} />
            </RemoveTargetBlank>
        </div>
    );
};

export default App;

