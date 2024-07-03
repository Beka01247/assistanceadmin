import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MainHeader from "../MainHeader";
import BurgerMenu from "../BurgerMenu";
import Messages from "./../ContentControl/Messages/Messages";
import Themes from "./../ContentControl/Themes/Themes";
import AllDisasters from "../CategoryControl/All/AllDisasters";
import Incidents from "./../IncidentModeration/Incidents";
import ExpandedForumTheme from "./../ContentControl/Themes/ExpandedForumTheme";
import ExtendedArticle from "../CategoryControl/ExtendedArticle";

const UserActivity = () => {
  const { userId } = useParams();
  const [contents, setContents] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [tab, setTab] = useState({ type: 0, id: null });

  useEffect(() => {
    if (userId) {
      fetchContents(tab.type);
    }
  }, [tab, userId]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const fetchContents = async (tabType) => {
    const endpoints = [
      `http://localhost:4010/api/admin/users/${userId}/forumMessages`,
      `http://localhost:4010/api/admin/users/${userId}/forums`,
      `http://localhost:4010/api/admin/users/${userId}/natdis`,
      `http://localhost:4010/api/admin/users/${userId}/natdis`,
      `http://localhost:4010/api/admin/users/${userId}/incidents`,
    ];

    try {
      const response = await axios.get(endpoints[tabType], {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setContents(response.data);
    } catch (error) {
      console.error("Error fetching contents:", error);
    }
  };

  return (
    <div className="flex flex-col">
      <MainHeader toggleMenu={toggleMenu} />
      <div className="w-full flex items-center relative">
        <div className="w-max flex mx-auto mt-8 text-lg text-[#1F1F1F] gap-6 font-medium">
          <span
            onClick={() => setTab({ type: 0, id: null })}
            className={
              "cursor-pointer px-2 " +
              (tab.type === 0
                ? `opacity-100 border-b-2 border-[#1F1F1F]`
                : `opacity-40`)
            }
          >
            Сообщения на форуме
          </span>
          <span
            onClick={() => setTab({ type: 1, id: null })}
            className={
              "cursor-pointer px-2 " +
              (tab.type === 1
                ? `opacity-100 border-b-2 border-[#1F1F1F]`
                : `opacity-40`)
            }
          >
            Статьи на форуме
          </span>
          <span
            onClick={() => setTab({ type: 2, id: null })}
            className={
              "cursor-pointer px-2 " +
              (tab.type === 2
                ? `opacity-100 border-b-2 border-[#1F1F1F]`
                : `opacity-40`)
            }
          >
            Объявления
          </span>
          <span
            onClick={() => setTab({ type: 4, id: null })}
            className={
              "cursor-pointer px-2 " +
              (tab.type === 4
                ? `opacity-100 border-b-2 border-[#1F1F1F]`
                : `opacity-40`)
            }
          >
            Инциденты
          </span>
        </div>
      </div>
      <BurgerMenu isOpen={menuOpen} toggleMenu={toggleMenu} />
      {tab.type === 0 && <Messages contents={contents} setTab={setTab} />}
      {tab.type === 1 && <Themes contents={contents} setTab={setTab} />}
      {tab.type === 2 && <AllDisasters contents={contents} setTab={setTab} />}
      {tab.type === 4 && <Incidents contents={contents} setTab={setTab} />}
      {tab.type === 5 && <ExpandedForumTheme forumId={tab.id} />}
      {tab.type === 6 && <ExtendedArticle natDisId={tab.id} />}
    </div>
  );
};

export default UserActivity;
