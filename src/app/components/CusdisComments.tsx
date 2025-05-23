"use client";
import { useEffect } from "react";

const CusdisComments = ({
  id,
  title,
  url,
}: {
  id: string;
  title: string;
  url: string;
}) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cusdis.com/js/cusdis.es.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return (
    <div className="w-full mt-10">
      <div
        id="cusdis_thread"
        data-host="https://cusdis.com"
        data-app-id="6bbcea2f-7112-4a34-aeb2-ae92ef5e0fa5"
        data-page-id={id}
        data-page-url={url}
        data-page-title={title}
        className="w-full"
        style={{
          minHeight: "300px", // Optional: ensures space is allocated
          overflow: "visible",
        }}
      />
    </div>
  );
};

export default CusdisComments;
