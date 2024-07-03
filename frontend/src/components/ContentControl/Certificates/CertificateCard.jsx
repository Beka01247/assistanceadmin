import React from "react";

const CertificateCard = ({ content, setTab }) => {
  return (
    <div
      className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm"
      onClick={() => setTab(5)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <svg
            className="w-6 h-6 text-gray-500 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 11V17M8 11V17M12 7V17M3 17H21"
            />
          </svg>
          <span className="text-gray-700 text-xs">Имя и Фамилия</span>
        </div>
        <span className="text-red-500 text-sm">{content.status}</span>
      </div>
      <div className="flex w-full justify-between gap-8 text-sm font-semibold">
        <div className="mb-4 w-1/2">
          <span className="block text-gray-700">{content.name}</span>
          <hr className="border-gray-300 mt-1" />
        </div>
        <div className="mb-4 w-1/2">
          <span className="block text-gray-700">{content.surname}</span>
          <hr className="border-gray-300 mt-1" />
        </div>
      </div>
      <div className="flex items-center">
        <span className="block text-gray-700 flex-1 text-xs">
          Номер телефона
        </span>
      </div>
      <div className="mb-4">
        <span className="flex justify-between text-gray-700 text-sm font-semibold">
          {content.phone}
          <svg
            className="w-6 h-6 text-gray-500 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 12m-3 9a9 9 0 100-18 9 9 0 000 18zM15 3v3m0 12v3m0-9H9m3-3h3m3 0h3m0 6h3"
            />
          </svg>
        </span>
        <hr className="border-gray-300 mt-1" />
      </div>
      <div className="flex items-center text-xs">
        <span className="block text-gray-700 flex-1">Сертификат</span>
      </div>
      <div>
        <span className="text-gray-700 text-sm flex justify-between font-semibold">
          {content.certificate_pdf ? "Available" : "Not available"}
          <svg
            className="w-6 h-6 text-gray-500 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 3v18M5 10h14M5 14h14"
            />
          </svg>
        </span>
        <hr className="border-gray-300 mt-1" />
      </div>
    </div>
  );
};

export default CertificateCard;
