import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo.jsx";
import User from "../assets/images/user.jsx";
import Password from "../assets/images/password.jsx";

function AdminLogin() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4010/api/admin/login",
        {
          name: name,
          password: password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        navigate("/admin");
      } else {
        console.error("Login failed: No token received");
      }
    } catch (error) {
      console.error(
        "Login failed:",
        error.response ? error.response.data : error
      );
    }
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <Logo />
      <div className="bebas-neue-regular font-bold flex flex-col justify-center items-center w-[146px] h-max mt-3 text-[rgba(225,55,55,1)]">
        СПАСАТЕЛИ
      </div>
      <form onSubmit={handleSubmit} className="mt-10 w-full max-w-sm">
        <div className="w-full h-[53px] border-b-[1px]">
          <span className="text-[rgba(125,143,157,1)]">Имя</span>
          <div className="flex flex-row w-full ">
            <input
              className="w-full"
              placeholder="Введите имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className="ml-auto mr-2">
              <User />
            </div>
          </div>
        </div>
        <div className="w-full h-[53px] border-b-[1px] mt-7">
          <span className="text-[rgba(125,143,157,1)]">Пароль</span>
          <div className="flex flex-row w-full ">
            <input
              type="password"
              className="w-full"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="ml-auto mr-2">
              <Password />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="rounded-[39px] bg-[rgba(225,55,55,1)] w-full h-[50px] mt-[32px] text-white"
        >
          Войти
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
