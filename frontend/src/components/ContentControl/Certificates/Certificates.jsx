import axios from "axios";
import React, { useEffect, useState } from "react";
import AllCertificates from "./AllCertificates";
import ExtendedCertificateCard from "./ExtendedCertificateCard";
import Back from "./../../../assets/images/back";

function Certificates() {
  const [contents, setContents] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    fetchContents();
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const fetchContents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4010/api/admin/users",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setContents(response.data);
    } catch (error) {
      console.error("Error fetching contents:", error);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="w-full flex items-center justify-center relative">
        <div
          className="absolute left-32 -top-16 font-medium text-lg flex items-center gap-4 cursor-pointer"
          onClick={() => setTab((prev) => (prev === 5 ? 0 : 0))}
        >
          <Back />
          Назад
        </div>
        <div className="w-max flex mx-auto -mt-4 text-base text-[#1F1F1F] gap-6 font-medium">
          <span
            onClick={() => setTab(0)}
            className={
              "cursor-pointer px-2 " +
              (tab === 0 || tab === 5
                ? `opacity-100 border-b-2 border-[#1F1F1F]`
                : `opacity-40`)
            }
          >
            Все
          </span>
        </div>
      </div>
      {tab === 0 && <AllCertificates setTab={setTab} contents={contents} />}
      {tab === 5 && <ExtendedCertificateCard contents={contents} />}
    </div>
  );
}

export default Certificates;
