import { useEffect } from "react";

interface MetadataOptions {
  title?: string;
  description?: string;
  keywords?: string;
}

export function useDocumentMetadata({ title, description, keywords }: MetadataOptions) {
  useEffect(() => {
    // Set dynamic document title
    const suffix = "House of Viraasat";
    const newTitle = title ? `${title} | ${suffix}` : suffix;
    document.title = newTitle;

    // Set dynamic description meta
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement("meta");
        metaDesc.setAttribute("name", "description");
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute("content", description);
    }

    // Set dynamic keywords meta
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement("meta");
        metaKeywords.setAttribute("name", "keywords");
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute("content", keywords);
    }
  }, [title, description, keywords]);
}
