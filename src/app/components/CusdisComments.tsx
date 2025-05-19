"use client";
import { useEffect } from "react";

const CusdisComments = ({ id, title, url }: { id: string; title: string; url: string }) => {
  useEffect(() => {
    const existing = document.getElementById("cusdis_thread");

    // Clear existing iframe
    if (existing) existing.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://cusdis.com/js/cusdis.es.js";
    script.async = true;
    script.defer = true;
    script.setAttribute("data-host", "https://cusdis.com");
    script.setAttribute("data-app-id", "e312aae3-456e-499b-b801-4ceb99ed2788"); // ✅ Replace with real App ID
    script.setAttribute("data-page-id", id);
    script.setAttribute("data-page-title", title);
    script.setAttribute("data-page-url", url);

    if (existing) {
      existing.appendChild(script);
    }

    // Cleanup
    return () => {
      if (existing) existing.innerHTML = "";
    };
  }, [id, title, url]);

  return <div id="cusdis_thread" className="mt-10" />;
};

export default CusdisComments;
