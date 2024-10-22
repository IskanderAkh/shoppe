import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useLogout from '../../Hooks/useLogout'

const Profile = () => {
    const navigate = useNavigate();

    const { data: user, isLoading, error } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axios.get('/api/auth/me');
            return res.data;
        },
        retry: 1,
        onError: () => {
            navigate('/login');
        }
    });
    const { logout } = useLogout()

    if (isLoading) return <div>Loading...</div>;

    if (!user) {
        navigate('/login');
        return null;
    }

    return (
        <div className='flex  justify-between h-screen'>
            <h1>Welcome, {user.firstName + ' ' + user.lastName}</h1>
            <div>
                {user && <button onClick={(e) => {
                    e.preventDefault();
                    logout();
                }}>Logout</button>}
            </div>
        </div>
    );
};

export default Profile;
