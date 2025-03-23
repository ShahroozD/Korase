const fs = require("fs");
const path = require("path");

const distDir = path.join(__dirname, "../dist");

// Locate the main index.html
const mainIndexPath = path.join(distDir, "index.html");
if (!fs.existsSync(mainIndexPath)) {
    console.error("❌ Main index.html not found in dist!");
    process.exit(1);
}

// Read and extract the script tag
const mainIndexContent = fs.readFileSync(mainIndexPath, "utf-8");
const scriptMatch = mainIndexContent.match(/<script[^>]+src="([^"]+)"[^>]*><\/script>/);

if (!scriptMatch) {
    console.error("❌ No script tag found in main index.html!");
    process.exit(1);
}

const scriptTag = scriptMatch[0];
console.log(`✅ Extracted script tag: ${scriptTag}`);

/**
 * Recursively updates all index.html files inside subdirectories.
 * @param {string} directory - Directory to scan for index.html files.
 */
function updateHtmlFiles(directory) {
    fs.readdirSync(directory, { withFileTypes: true }).forEach(entry => {
        const entryPath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
            updateHtmlFiles(entryPath); // Recurse into subdirectories
        } else if (entry.isFile() && entry.name === "index.html") {
            try {
                let content = fs.readFileSync(entryPath, "utf-8");

                // Insert script before </body>, or append it if </body> is missing
                const updatedContent = content.includes("</body>")
                    ? content.replace("</body>", `${scriptTag}\n</body>`)
                    : content + `\n${scriptTag}`;

                fs.writeFileSync(entryPath, updatedContent, "utf-8");
                console.log(`✅ Updated: ${entryPath}`);
            } catch (error) {
                console.error(`❌ Error updating ${entryPath}:`, error);
            }
        }
    });
}

// Start updating from the dist directory
updateHtmlFiles(distDir);
console.log("🎉 All index.html files updated!");
