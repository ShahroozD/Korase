const templates = import.meta.glob('../templates/**/*.jsx'); // Adjust path as needed

export const getTemplate = async () => {
    const TEMPLATE_NAME = import.meta.env.VITE_TEMPLATE_NAME || "BlogTemplate";
    const TEMPLATE_PATH = `../templates/${TEMPLATE_NAME}/index.jsx`;

    if (!templates[TEMPLATE_PATH]) {
        console.error(`Template ${TEMPLATE_PATH} not found!`);
        return null;
    }

    const module = await templates[TEMPLATE_PATH]();
    return module.default;
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