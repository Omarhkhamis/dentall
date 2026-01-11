"use client";

import { useEffect, useRef } from "react";

export default function CustomHeadSnippet({ html }) {
  const addedNodesRef = useRef([]);

  useEffect(() => {
    if (!html) return undefined;

    const template = document.createElement("template");
    template.innerHTML = html;

    const addedNodes = [];
    template.content.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE && !node.textContent.trim()) {
        return;
      }

      let toInsert = null;
      if (node.nodeName === "SCRIPT") {
        const script = document.createElement("script");
        Array.from(node.attributes).forEach((attr) => {
          script.setAttribute(attr.name, attr.value);
        });
        script.textContent = node.textContent;
        toInsert = script;
      } else {
        toInsert = node.cloneNode(true);
      }

      document.head.appendChild(toInsert);
      addedNodes.push(toInsert);
    });

    addedNodesRef.current = addedNodes;

    return () => {
      addedNodesRef.current.forEach((node) => {
        node.parentNode?.removeChild(node);
      });
      addedNodesRef.current = [];
    };
  }, [html]);

  return null;
}
