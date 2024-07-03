import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const UserModal = ({isOpen, onClose, user}) => {

  return isOpen && ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-4 rounded-lg shadow-lg relative">
          <button onClick={onClose} className="absolute top-2 right-2 text-lg">&times;</button>  
          <h2 className="text-lg font-bold">User Details</h2>
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Password:</strong> {user.password}</p>
        </div>
    </div>,
    document.body
  );
};

export default UserModal;