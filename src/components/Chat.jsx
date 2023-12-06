// src/components/Chat.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  serverTimestamp,
  orderBy,
  query
} from "firebase/firestore";
import { auth, db } from "../main";
import { useLogin } from "../hooks/useLogin";

const Chat = () => {
  const location = useLocation();
  const chatId = location.pathname.split("/")[2];
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const { login, user, loadingSession } = useLogin();
  // Mensaje de error si no hay chatId
  if (!chatId) {
    return <div className="flex-grow p-4">Selecciona una sala.</div>;
  }

  useEffect(() => {
    const chatroomRef = doc(db, "chatgroup", chatId);
    const messagesRef = collection(chatroomRef, "messages");

    const unsubscribe = onSnapshot(
      query(messagesRef, orderBy("fecha")),
      messagesRef, (snapshot) => {
      const newMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(newMessages);
    });

    return () => {
      unsubscribe(); // Desuscribirse cuando el componente se desmonta
    };
  }, [chatId]);

  const sendMessage = async (event) => {
    event.preventDefault();

    if (messageInput.trim() !== "") {
      const chatroomRef = doc(db, "chatgroup", chatId);
      const messagesRef = collection(chatroomRef, "messages");

      await addDoc(messagesRef, {
        chat_id: chatId,
        description: messageInput,
        email: auth.currentUser.email,
        fecha: serverTimestamp(),
      });
      setMessageInput("");
    }
  };

  return (
    <div className="flex h-full flex-col border-l border-stroke dark:border-strokedark xl:w-3/4 bg-white">
      <div className="no-scrollbar max-h-full space-y-3.5 overflow-auto px-6 py-7.5">
        {messages.map((message) => (
          <div
            key={message.id}
            className={
              auth.currentUser.email === message.email
                ? "ml-auto max-w-125"
                : "max-w-125"
            }
          >
            <p
              className={
                auth.currentUser.email === message.email
                  ? "mb-2.5 text-sm font-medium text-right text-primary"
                  : "mb-2.5 text-sm font-medium text-primary"
              }
            >
              {message.email}
            </p>
            <div
              className={
                auth.currentUser.email === message.email
                  ? "mb-2.5 rounded-2xl rounded-br-none bg-primary py-3 px-5"
                  : "mb-2.5 rounded-2xl rounded-tl-none bg-gray py-3 px-5 dark:bg-boxdark-2"
              }
            >
              <p
                className={
                  auth.currentUser.email === message.email ? "text-white" : ""
                }
              >
                {message.description}
              </p>
            </div>
            <p
              className={
                auth.currentUser.email === message.email
                  ? "text-right text-xs"
                  : "text-xs"
              }
            >
              {message.fecha
                ? message.fecha.toDate().toString()
                : "Fecha no disponible"}
            </p>
          </div>
        ))}
      </div>

      <div className="sticky bottom-0 border-t border-stroke bg-white py-5 px-6 dark:border-strokedark dark:bg-boxdark">
        <form
          className="flex items-center justify-between space-x-4.5"
          onSubmit={sendMessage}
        >
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Escribe un mensaje"
              className="h-13 w-full rounded-md border border-stroke bg-gray pl-5 pr-19 text-black placeholder-body outline-none focus:border-primary dark:border-strokedark dark:bg-boxdark-2 dark:text-white"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="flex h-13 w-full max-w-13 items-center justify-center rounded-md bg-primary text-white hover:bg-opacity-90"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 2L11 13"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M22 2L15 22L11 13L2 9L22 2Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
