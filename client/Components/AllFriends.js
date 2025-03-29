'use client'

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AllFriends({ myId }) {
    const [friends, setFriends] = useState([]);

    const unfriendHandler = async({ id }) => {
        try {
            const data = await fetch(`${process.env.server}/api/friend/remove/${id}`, {
                method: "DELETE",
                credentials: "include"
            });
            const res = await data.json();
            if(data.ok) {
                toast.success("Unfriend Successfull!");
                const allFriends = friends.filter((item) => item._id !== res._id);
                
                setFriends(allFriends);
            } else {
                toast.error(res.error); 
            }
        } catch(err) {
            console.log(err.message);
            toast.error(err.message);             
        }
    }
    
    useEffect(() => {
        const getFriends = async() => {
            try {
                const data = await fetch(`${process.env.server}/api/friend/all`, {
                    credentials: "include"
                });
                if(data.ok) {
                    const res = await data.json();
                    setFriends(res);
                }
            } catch(err) {
                console.log(err.message);                
            }
        }
        getFriends();
    }, []);

    return (
        <div className="flex flex-wrap gap-2">
        {friends?.map((item) => (
            <div key={item?._id} className="dark:bg-gray-800 bg-white rounded-md p-2 px-2.5">
                <img
                    className='rounded-md h-[130px] w-[130px] object-cover'
                    src={`../profile/${item?.senderId?._id === myId ? item?.receiverId?.image : item?.senderId?.image}`} 
                    alt='Profile pic'
                />
                <div className="text-center mt-1">
                    <h4>{item?.senderId?._id === myId ? item?.receiverId?.name : item?.senderId?.name}</h4>                        
                    <button onClick={(e) => unfriendHandler({id: item._id})} className="text-white rounded-lg bg-red-600 px-2 py-1 outline-hidden hover:bg-red-900 duration-500">Unfriend</button>
                </div>
            </div>
        ))}
        </div>
    )
}