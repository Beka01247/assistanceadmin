import React, { useState, useEffect } from "react";
import axios from "axios";
import AddStudyCenterForm from "./AddStudyCenterForm";
import Map from "./Map";
import MainHeader from "../MainHeader";
import BurgerMenu from "../BurgerMenu";

function StudyCenters() {
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    fetchStudyCenters();
  }, []);

  const fetchStudyCenters = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:4010/api/user/study-centers",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCenters(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch study centers:", error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full items-center">
      <MainHeader toggleMenu={toggleMenu} />
      <BurgerMenu isOpen={menuOpen} toggleMenu={toggleMenu} />
      {tab === 0 && <Map setTab={setTab} tab={tab} centers={centers} />}
      {tab === 1 && <AddStudyCenterForm setTab={setTab} tab={tab} />}
    </div>
  );
}

export default StudyCenters;
