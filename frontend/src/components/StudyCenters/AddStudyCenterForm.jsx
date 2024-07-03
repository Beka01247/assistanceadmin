import React, { useState } from "react";
import InputMask from "react-input-mask";
import TabSwitcher from "./TabSwitcher";
import axios from "axios";

const AddStudyCenterForm = ({ setTab, tab }) => {
  const [formData, setFormData] = useState({
    city: "",
    address: "",
    latitude: "",
    longitude: "",
    time_open: "",
    time_close: "",
    email: "",
    website_link: "",
    phone_number: "",
    whatsapp_link: "",
    telegram_link: "",
    instagram_link: "",
    type: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fetchCoordinates = async (address) => {
    const apiKey = "AIzaSyAoeJsYR20gUXEXBtXDM49xoNYByvFAbZg";
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`;

    try {
      const geocodeResponse = await axios.get(geocodeUrl);
      const location = geocodeResponse.data.results[0].geometry.location;
      return {
        latitude: location.lat,
        longitude: location.lng,
      };
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Fetch latitude and longitude from address
    const coordinates = await fetchCoordinates(formData.address);

    console.log(coordinates);

    if (coordinates) {
      const finalFormData = {
        ...formData,
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
      };

      console.log(finalFormData);

      try {
        const response = await axios.post(
          "http://localhost:4010/api/admin/study-centers/add",
          finalFormData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("Center added:", response.data);
      } catch (error) {
        console.error("Error adding center:", error);
      }
    } else {
      console.error("Failed to get coordinates");
    }
  };

  return (
    <div className="h-max flex items-center justify-center w-[55%] mt-2">
      <div className="bg-white rounded-lg w-full mx-auto">
        <TabSwitcher tab={tab} setTab={setTab} />
        <h2 className="text-gray-900 font-semibold text-xl mb-2">Информация</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
            <div>
              <label className="block text-gray-700 mb-1">Адрес центра</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border-b border-gray-300  p-2 focus:outline-none focus:border-gray-500"
                placeholder="Введите адрес центра"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border-b border-gray-300  p-2 focus:outline-none focus:border-gray-500"
                placeholder="Введите email"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">
                Контактный номер
              </label>
              <InputMask
                mask="+7 (999) 999-99-99"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                className="w-full border-b border-gray-300  p-2 focus:outline-none focus:border-gray-500"
                placeholder="+7 (___) ___-__-__"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">
                Юридическая сущность
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border-b border-gray-300  p-2 focus:outline-none focus:border-gray-500"
              >
                <option value="">Выберите тип</option>
                <option value="ИП">Для ИП</option>
                <option value="Юр.лицо">Для Юр.лиц</option>
                <option value="Физ.лицо">Для Физ.лиц</option>
              </select>
            </div>
          </div>
          <h2 className="text-gray-900 font-semibold text-xl mb-2">
            Часы работы
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
            <div>
              <label className="block text-gray-700 mb-1">От</label>
              <input
                type="text"
                name="time_open"
                value={formData.time_open}
                onChange={handleChange}
                className="w-full border-b border-gray-300  p-2 focus:outline-none focus:border-gray-500"
                placeholder="10:00"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">До</label>
              <input
                type="text"
                name="time_close"
                value={formData.time_close}
                onChange={handleChange}
                className="w-full border-b border-gray-300  p-2 focus:outline-none focus:border-gray-500"
                placeholder="20:00"
              />
            </div>
          </div>
          <h2 className="text-gray-900 font-semibold text-xl mb-2">Соц.сети</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
            <div>
              <label className="block text-gray-700 mb-1">Instagram</label>
              <input
                type="text"
                name="instagram_link"
                value={formData.instagram_link}
                onChange={handleChange}
                className="w-full border-b border-gray-300  p-2 focus:outline-none focus:border-gray-500"
                placeholder="Введите Instagram"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">WhatsApp</label>
              <InputMask
                mask="+7 (999) 999-99-99"
                name="whatsapp_link"
                value={formData.whatsapp_link}
                onChange={handleChange}
                className="w-full border-b border-gray-300  p-2 focus:outline-none focus:border-gray-500"
                placeholder="+7 (___) ___-__-__"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Telegram</label>
              <input
                type="text"
                name="telegram_link"
                value={formData.telegram_link}
                onChange={handleChange}
                className="w-full border-b border-gray-300  p-2 focus:outline-none focus:border-gray-500"
                placeholder="Введите Telegram"
              />
            </div>
          </div>
          <div className="w-full flex justify-center">
            <button
              type="submit"
              className="bg-[#E13737] text-white font-semibold py-2 px-4 rounded-full w-1/2"
            >
              Добавить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudyCenterForm;
