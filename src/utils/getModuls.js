export const getTemplate = async () => {
    const TEMPLATE_PATH = import.meta.env.VITE_TEMPLATE_PATH || "../../templates";
    const TEMPLATE_NAME = import.meta.env.VITE_TEMPLATE_NAME || "BlogTemplate";
    try {
        const module = await import(`${TEMPLATE_PATH}/${TEMPLATE_NAME}`);
        console.log('Module loaded:', module);  // Check what you get
        return module.default;  // Return the component if available
    } catch (error) {
        console.error('Error loading template:', error);
        return null;
    }
};



export const loadPlugins = async () => {
    const pluginsGlob = import.meta.glob("../plugins/*/*.{js,ts,jsx,tsx}");
    try {
        const plugins = [];

        for (const path in pluginsGlob) {
            const module = await pluginsGlob[path]();
            plugins.push(module.default || module);
        }

        console.log("Plugins loaded:", plugins);
        return plugins;
    } catch (error) {
        console.error("Error loading plugins:", error);
        return [];
    }
};