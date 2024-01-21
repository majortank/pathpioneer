import React, {useState, useEffect} from 'react'
import './app.css';
import { useAuth } from './contexts/auth';
import axios from 'axios';
import toast from 'react-hot-toast';

const Updates = () => {
    const {user} = useAuth();
    const [loading, setLoading] = useState(true);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const getNotifications = async () => {
            try {
                const res = await axios.get('https://www.pioneerapi.tangikuu.tech/notifications');
                setNotifications(res.data);
                setLoading(false);
                toast.success("See new updates here!", {
                    icon: '🙂',
                  });
            } catch (error) {
                toast.error(error.message, {
                    icon: '😕',
                  });
            }
        };

        getNotifications();
    }, []);
    if (loading) {
        return <span className="loading loading-bars loading-lg"></span>;
    }
    
    
  return (
     <div className=''>
        <h1 className="my-4 text-center text-4xl font-extrabold tracking-tight leading-none text-primary md:text-5xl lg:text-6xl dark:text-white">New Features/Bug Fixes or Improvements</h1>
        <div className="py-8 px-4 w-full mx-auto max-w-screen-xl text-center lg:py-16 z-10 relative flex flex-row gap-2">
            {notifications.map((notification, index) => (
                <div key={index}  className="max-w-lg p-6 bg-secondary border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    
                    <h1 className="mb-2 text-2xl font-semibold tracking-tight text-white dark:text-white">{notification.title}</h1>
                    <p className="mb-3 font-normal text-white dark:text-gray-400">{notification.content}</p>
                    <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">{notification.timestamp}</span>
                    <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">{notification.type}</span>

                </div>
            ))} 
        </div>
    </div>
  )
}

export default Updates