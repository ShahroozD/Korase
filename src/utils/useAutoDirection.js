import { useEffect } from "react";

function useAutoDirection() {
  useEffect(() => {
    // Apply `dir="auto"` to all existing elements
    document.querySelectorAll('*').forEach((element) => {
      element.setAttribute('dir', 'auto');
    });

    // Observe new elements and set `dir="auto"`
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) { // Element node
            node.setAttribute('dir', 'auto');
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect(); // Clean up on unmount
  }, []);
}

export default useAutoDirection;