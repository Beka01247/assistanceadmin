import React, { useState, useEffect } from "react";
import axios from "axios";
import ContentCard from "./ContentCard";
import ReadMoreButton from "./../../ContentControl/Themes/ReadMoreButton";

export default function SystemDisasters({ setTab }) {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4010/api/admin/disasters",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const systemDisasters = response.data.filter(
        (disaster) => disaster.type === "Системные"
      );
      setContents(systemDisasters);
    } catch (error) {
      console.error("Error fetching contents:", error);
    }
  };

  return (
    <div className="flex flex-col w-[72.5%] mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 p-7 ml-8">
        {contents.map((content, index) => (
          <ContentCard
            key={index}
            content={content}
            setTab={() => setTab({ type: 5, id: content.nat_dis_id })}
          />
        ))}
      </div>
      <ReadMoreButton />
    </div>
  );
}
