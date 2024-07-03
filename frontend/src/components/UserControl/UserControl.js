import React, { useState, useEffect } from "react";
import axios from "axios";
import BurgerMenu from "../BurgerMenu";
import MainHeader from "../MainHeader";
import UserCard from "./UserCard";
import ProfileCard from "./UserModal";

function UserControl() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4010/api/admin/users",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <div>
      <MainHeader toggleMenu={toggleMenu} />
      <BurgerMenu isOpen={menuOpen} toggleMenu={toggleMenu} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 p-4 ml-[50px] mt-3">
        {users.map((user) => (
          <UserCard
            key={user.user_id}
            user={user}
            onClick={() => handleClick(user)}
          />
        ))}
      </div>
      {selectedUser && (
        <ProfileCard
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
}

export default UserControl;
