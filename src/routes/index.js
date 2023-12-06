import { useEffect, lazy, useState } from 'react';
import { db } from '../main.jsx';
import { collection, getDocs } from 'firebase/firestore';

const Principal = lazy(() => import('../components/Chat'));

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

  return loading ? null : groups.map((group) => ({
    path: `/chat/${group.id}`,
    title: group.name,
    component: Principal,
  }));
};

export default Rutas;