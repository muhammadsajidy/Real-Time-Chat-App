import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import socket from '../socket';

export default function Root() {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');

    const handleClick = () => {
        if (username !== '') {
            socket.emit('new_user', {
                socket_id: socket.id,
                username: username,
            });
            navigate('/chat');
        }
        else
            alert('Please enter a username');
    }

    return (
        <>
            <div className='w-[100vw] h-[100vh] flex justify-center items-center'>
                <div className='w-[45%] lg:w-[25%] h-[35%] border-[1px] border-black rounded-md flex flex-col justify-between py-5 items-center'>
                    <h2 className='text-3xl'>Start chatting</h2>
                    <TextField 
                    required
                    label='Username' 
                    variant='outlined'
                    onChange={(e) => setUsername(e.target.value)}
                    />
                    <Button variant='contained' onClick={handleClick}>Join</Button>
                </div>
            </div>
        </>
    )
}