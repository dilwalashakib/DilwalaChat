'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function SendRequest() {
    const [friends, setFriends] = useState([]);

    const removeFriendHandler = async({ id }) => {
        try {
            const data = await fetch(`${process.env.server}/api/friend/remove/${id}`, {
                method: "DELETE",
                credentials: "include"
            });
            const res = await data.json();
            if(data.ok) {
                toast.success("Remove Successfull!");
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
                const data = await fetch(`${process.env.server}/api/friend/send-requests`, {
                    credentials: "include"
                });
                if(data.ok) {
                    const res = await data.json();
                    console.log(res);
                    
                    setFriends(res);
                }  
            } catch(err) {
                console.log(err.message);                
            }
        }
        getFriends();
    }, []);

    return (
        friends?.length > 0 ? (<div className="flex flex-wrap gap-2">
        {friends?.map((item) => (
            <div key={item?._id} className="dark:bg-gray-800 bg-white rounded-md p-2 px-2.5">
                <img
                    className='rounded-md h-[130px] w-[130px] object-cover'
                    src={`../profile/${item?.receiverId?.image ? item.receiverId.image : "default.png"}`} 
                    alt='Profile pic'
                />
                <div className="text-center mt-1">
                    <h4>{item?.receiverId?.name}</h4>                    
                    <button onClick={(e) => removeFriendHandler({id: item._id})} className="text-white rounded-lg bg-red-600 px-2 py-1 outline-none hover:bg-red-900 duration-500">Remove</button>
                </div>
            </div>
        ))}
        </div>) : ( <div>
            <span className="text-lg">No Send Request Here ! You Can go All Users List </span>
            <Link className="text-xl text-blue-600" href="/users">Users</Link>
        </div>
        )
    )
}