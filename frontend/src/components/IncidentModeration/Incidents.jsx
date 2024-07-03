import React from "react";
import ContentCard from "./ContentCard";

const Incidents = ({ contents }) => {
  return (
    <div className="min-h-screen py-8 px-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contents.map((content, index) => (
          <ContentCard key={index} content={content} />
        ))}
      </div>
    </div>
  );
};

export default Incidents;
