'use client';

import io from "socket.io-client";
import { createContext, useEffect, useRef, useState } from "react";

// create message context
export const MessengerContext = createContext();

const MessengerProvider = ({ children, userInfo }) => {
    const [users, setUsers] = useState([]);
    const [activeUsers, setActiveUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [socketMsg, setSocketMsg] = useState("");
    const socketRef = useRef(null);

    useEffect(() => {
        if(userInfo) {
            if(!socketRef.current) {
                socketRef.current = io(process.env.server, {
                    query: {
                        userId: userInfo.id
                    }
                });
            }

            socketRef.current.on('connect', () => {
                socketRef.current.on("getUsers", (users) => {
                    setActiveUsers(users);
                });
                socketRef.current.on("getMessage", (msg) => {
                    setSocketMsg(msg);
                });      
            });
        }
    }, [userInfo]);

    return (
        <MessengerContext.Provider value={{
            users,
            activeUsers,
            messages,
            socketMsg,
            socket: socketRef?.current,
            setSocketMsg,
            setMessages,
            setUsers,
        }}>        
            {children}
        </MessengerContext.Provider>
    )
}

export default MessengerProvider;