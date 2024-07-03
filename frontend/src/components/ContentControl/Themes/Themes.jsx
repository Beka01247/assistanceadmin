import React from "react";
import ContentCard from "./ContentCard";
import ReadMoreButton from "./ReadMoreButton";

export default function Themes({ contents, setTab }) {
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 p-7 ml-8">
        {contents.map((content, index) => (
          <ContentCard key={index} content={content} setTab={setTab} />
        ))}
      </div>
      <ReadMoreButton />
    </div>
  );
}
