import Button from '@mui/material/Button';
import socket from '../socket';
import { useState, useEffect } from 'react';

export default function Chat() {

    const [message, setMessage] = useState('');
    const [messageReceived, setMessageReceived] = useState([]);
    const [room, setRoom] = useState('');

    const joinRoom = () => {
        if (room !== '')
            socket.emit('join_room', room);
    }

    const sendMessage = () => {
        socket.emit('send_message', { message, room });
        setMessage('');
    };

    useEffect(() => {
        socket.on('receive_message', (data) => {
            setMessageReceived((prevMessages) => [...prevMessages, data]);
        });

        return () => socket.off('receive_message');
    }, [socket]);

    return (
        <>
            <div className='w-[100vw] h-[100vh] flex justify-center'>
                <div className="w-full h-[70%] overflow-y-auto p-4">
                {messageReceived.map((msg, index) => (
                    <div key={index} className="p-2 bg-gray-200 my-2 rounded">
                        <h2 className="text-lg font-bold">
                            [User {msg.sender} from Room {msg.room}:]
                        </h2>
                        <p className="text-base">{msg.message}</p>
                    </div>
                ))}
                </div>
                <div className='w-[65%] h-[100%] flex flex-col items-center bg-zinc-200'>
                    <div className='top-0 w-[90%] h-[10%] flex justify-center items-center'>
                        <input 
                        type='text' 
                        placeholder='Type something'
                        className='w-[75%] h-[60%] px-3 outline-none border-[1px] border-black rounded-md' 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        />
                        <Button variant='contained' onClick={sendMessage}>Send</Button>
                        <input 
                        type='text' 
                        className='w-[25%] h-[60%] ml-5 px-3 outline-none border-[1px] border-black rounded-md' 
                        onChange={(e) => setRoom(e.target.value)}
                        />
                        <Button variant='contained' onClick={joinRoom}>Join</Button>
                    </div>
                </div>
            </div>
        </>
    )
}