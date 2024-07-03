import React from "react";
import CertificateCard from "./CertificateCard";

export default function AllCertificates({ setTab, contents }) {
  return (
    <div className="w-full flex justify-center">
      <div className="w-[70%] grid grid-cols-1 lg:grid-cols-3 gap-4 py-2 px-7 ml-8">
        {contents.map((certificate, index) => (
          <CertificateCard
            content={certificate}
            index={index}
            setTab={setTab}
          />
        ))}
      </div>
    </div>
  );
}
