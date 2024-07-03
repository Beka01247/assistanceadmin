import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const Modal = ({ isOpen, onClose, id }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const userId = localStorage.getItem('userId'); 

    const fetchMessages = async () => {
        try {
            const response = await axios.get(`http://localhost:4010/api/user/forum/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setMessages(response.data);
        } catch (error) {
            console.error("Failed to fetch messages:", error);
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchMessages();
        }
    }, [id, isOpen]);

    const handleAddMessage = async (event) => {
      event.preventDefault();
      if (typeof newMessage === 'undefined' || !newMessage.trim()) return;
  
      try {
          console.log("Sending message with user ID:", userId);
          const response = await axios.post(`http://localhost:4010/api/user/forum/${id}/add-message`, {
              user_id: userId,
              content: newMessage
          }, {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                  'Content-Type': 'application/json'
              }
          });
          if (response.data) {
              setMessages([...messages, response.data]); 
              setNewMessage('');  
          }
          fetchMessages();
      } catch (error) {
      console.error("Failed to add message:", error);
      }
    };
  

    return isOpen && ReactDOM.createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg shadow-lg relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-lg">&times;</button>
                <ul>
                {messages.length > 0 ? (
                    messages.map(message => (
                        <li key={message.id}>
                            <div><strong>{message.username}:</strong> {message.content}</div>
                        </li>
                    ))
                ) : (
                    <li>No messages</li>
                )}
                </ul>
                <form onSubmit={handleAddMessage} className="mt-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Write a message..."
                        className="border p-2 w-full rounded"
                    />
                    <button type="submit" className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Send
                    </button>
                </form>

            </div>
        </div>,
        document.body
    );
};

export default Modal;
