import { useEffect, lazy, useState } from 'react';
import { db } from '../main.jsx';
import { collection, getDocs } from 'firebase/firestore';

const Principal = lazy(() => import('../components/Chat'));
/*
const Rutas = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChatGroups = async () => {
      try {
        const chatGroupsCollection = collection(db, 'chatgroup');
        const querySnapshot = await getDocs(chatGroupsCollection);
        const groupsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGroups(groupsData);
      } catch (error) {
        console.error('Error fetching chat groups:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChatGroups();
  }, []);

  console.log("Llega...");
  return loading ? null : groups.map((group) => ({
    path: `/chat/${group.id}`,
    title: group.name,
    component: Principal,
  }));
};*/

const coreRoutes = [
  {
    path: '/chat/0w079THcmPdjpChYKmQN',
    title: 'Charla Tecnológica',
    component: Principal,
  },
  {
    path: '/chat/2tZh8ELGbdp0r6z0DPBa',
    title: 'Club de Lectura',
    component: Principal,
  }
];

const Rutas = [...coreRoutes];
export default Rutas;