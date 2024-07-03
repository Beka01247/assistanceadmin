import React, { useState } from "react";
import MainHeader from "../MainHeader";
import BurgerMenu from "../BurgerMenu";

const CreateNotification = () => {
  const [activeTab, setActiveTab] = useState("Очевидец");
  const [menuOpen, setMenuOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [expoPushToken, setExpoPushToken] = useState(""); // This needs to be set correctly

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const sendMessage = async () => {
    if (!expoPushToken) {
      alert("Expo Push Token is missing. Please set the token.");
      return; // Stop execution if token is not set
    }

    const messageData = {
      to: expoPushToken,
      sound: "default",
      title: "Заголовок",
      body: message,
    };

    console.log("Sending message:", messageData); // Log data being sent

    try {
      const response = await fetch(
        "http://localhost:4010/api/admin/send-notification",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(messageData),
        }
      );
      const data = await response.json();
      if (response.ok) {
        alert("Уведомление отправлено успешно!");
      } else {
        console.error("Response error:", data);
        alert(`Не удалось отправить уведомление: ${data.error}`);
      }
    } catch (error) {
      console.error("Error sending notification:", error);
      alert(
        "Ошибка при отправке уведомления. Проверьте консоль для подробностей."
      );
    }
  };

  return (
    <div className="w-full h-full">
      <MainHeader toggleMenu={toggleMenu} />
      <div className="w-full h-[80vh] flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md my-auto">
          <h2 className="text-center text-lg font-semibold mb-4">
            Написать PUSH-оповещение
          </h2>
          {/* UI Components */}
          <div className="mb-4">
            <label className="block text-gray-700">Уведомление</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-2 text-gray-700 w-full outline-none h-28 placeholder:text-wrap"
              placeholder="Введите текст уведомления"
            />
            <hr className="border-gray-300 mt-2" />
          </div>
          <button
            className="bg-[#E13737] text-white font-semibold py-2 px-4 rounded-full w-full"
            onClick={sendMessage}
          >
            Отправить
          </button>
        </div>
      </div>
      <BurgerMenu isOpen={menuOpen} toggleMenu={toggleMenu} />
    </div>
  );
};

export default CreateNotification;
