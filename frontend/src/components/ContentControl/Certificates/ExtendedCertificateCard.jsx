import React from "react";
import axios from "axios";

import CertificateCard from "./CertificateCard";

const Status = () => {
  return (
    <div className="bg-white p-6 w-[50%]">
      <div className="flex items-center w-full mb-4 border-b-[1px] border-gray-300 pb-2">
        <span className="text-gray-700 font-semibold">Не просмотрено</span>
        <input
          type="radio"
          name="status"
          className="mr-2 ml-auto custom-radio"
          checked
        />
      </div>
      <div className="flex items-center mb-4 w-full border-b-[1px] border-gray-300 pb-2">
        <span className="text-gray-700 font-semibold">Одобренно</span>
        <input
          type="radio"
          name="status"
          className="mr-2 ml-auto custom-radio"
        />
      </div>
      <div className="flex items-center w-full mb-4 border-b-[1px] border-gray-300 pb-2">
        <span className="text-gray-700 font-semibold">Отклонено</span>
        <input
          type="radio"
          name="status"
          className="mr-2 ml-auto custom-radio"
        />
      </div>
      <div className="flex items-center w-full mb-4 border-b-[1px] border-gray-300 pb-2">
        <span className="text-gray-700 font-semibold">Архив</span>
        <input
          type="radio"
          name="status"
          className="mr-2 ml-auto custom-radio"
        />
      </div>
    </div>
  );
};

const ExtendedCertificateCard = ({ contents }) => {
  const selectedCertificate = contents.find((c) => c.certificate_pdf);

  const downloadCertificate = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:4010/api/user/${userId}/certificate`,
        {
          responseType: "blob",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      // Create a link element
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "certificate.pdf");

      // Append to the document body and trigger the download
      document.body.appendChild(link);
      link.click();

      // Clean up and remove the link
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Error downloading certificate:", error);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen space-y-6">
      <div className="flex space-x-6 w-[50%]">
        <div className="flex flex-col w-[50%]">
          <CertificateCard content={selectedCertificate} />
          <button
            className="bg-[#E13737] text-white px-16 py-2 rounded-2xl mt-4"
            onClick={() => downloadCertificate(selectedCertificate.user_id)}
          >
            Скачать PDF
          </button>
        </div>
        <Status />
      </div>
    </div>
  );
};

export default ExtendedCertificateCard;
