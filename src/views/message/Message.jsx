import axios from "axios";

import { useEffect, useState } from "react";

export default function Message() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          "https://cyber-craft-backend.vercel.app/message"
        );
        setMessages(response.data); // Assuming response.data contains the messages
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);
  return (
    <div>
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Messages</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 shadow-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">#</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Message</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg, index) => (
                <tr
                  key={index}
                  className="bg-white even:bg-gray-100 hover:bg-gray-50"
                >
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {msg.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {msg.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {msg.message}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
