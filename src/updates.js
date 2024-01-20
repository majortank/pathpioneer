import React, {useState, useEffect} from 'react'
import './app.css';
import { useAuth } from './contexts/auth';
import axios
 from 'axios';
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
        
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 z-10 relative">
        <section className="bg-indigo-50  dark:bg-gray-900 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')] flex flex-row gap-4">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-primary md:text-5xl lg:text-6xl dark:text-white">New Features/Bug Fixes or Improvements</h1>
            {notifications.map((notification, index) => (
                <div key={index} className="card w-3/5 my-5 bg-secondary text-neutral-content">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title text-base-100">{notification.title}</h2>
                        <p className='text-base-100'>{notification.content}</p>
                        <div className="card-actions justify-end">
                        <button className="btn  btn-disabled text-gray-800">{notification.timestamp}</button>
                        <button className="btn btn-disabled text-gray-800">{notification.type}</button>
                        </div>
                    </div>
                </div>
            ))}
        </section>
        </div>
        
        
    </div>
  )
}

export default Updates