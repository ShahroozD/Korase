
import { useEffect } from 'react'

const RemoveTargetBlank = ({ children }) => {
  useEffect(() => {
      const handleLinkClick = (event) => {
          const link = event.target.closest('a'); // Finds the closest <a> tag

          // Check if link exists, has href, and has target="_blank"
          if (link && link.getAttribute('target') === '_blank') {
              event.preventDefault(); // Prevent default behavior
              link.removeAttribute('target'); // Remove the `target="_blank"`
              
              // Programmatically navigate to the link’s href within the same tab
              window.location.href = link.href;
          }
      };

      // Add a click event listener on document
      document.addEventListener('click', handleLinkClick);

      // Clean up event listener on unmount
      return () => document.removeEventListener('click', handleLinkClick);
  }, []);

  return children;
};

export default RemoveTargetBlank;