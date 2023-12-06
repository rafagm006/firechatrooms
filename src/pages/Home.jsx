// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Menu from "../components/Menu";
import Messages from "../components/Messages";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../main";

const Home = () => {
  const [chatGroups, setChatGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChatGroups = async () => {
      try {
        const chatGroupsCollection = collection(db, "chatgroup");
        const querySnapshot = await getDocs(chatGroupsCollection);
        const groups = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setChatGroups(groups);
      } catch (error) {
        setError("Error al cargar las salas de chat...");
      } finally {
        setLoading(false);
      }
    };

    fetchChatGroups();
  }, []);

  return (
    <div className="flex">
      <Menu chatGroups={chatGroups} />
      <Messages />
    </div>
  );
};

export default Home;
