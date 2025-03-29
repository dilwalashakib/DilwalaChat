'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function FriendRequest() {
    const router = useRouter();
    const [friends, setFriends] = useState([]);

    const confirmFriendRequest = async({ id }) => {
        try {
            const data = await fetch(`${process.env.server}/api/friend/confirm-request/${id}`, {
                method: "PUT",
                credentials: "include",
            });
            const res = await data.json();
            if(data.ok) {
                toast.success(res?.success);
                router.push("/friends")
                console.log(res);
            } else {
                toast.error(res.error); 
            }
        } catch(err) {
            console.log(err.message);
            toast.error(err.message);             
        }
        
    }

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
                const data = await fetch(`${process.env.server}/api/friend/requests`, {
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
                    src={`../profile/${item?.senderId?.image ? item.senderId.image : "default.png"}`} 
                    alt='Profile pic'
                />
                <div className="text-center mt-1">
                    <h4>{item?.senderId?.name}</h4>
                    <div className="flex flex-col gap-1">
                        <button onClick={(e) => confirmFriendRequest({id: item._id})} className="text-white rounded-lg bg-blue-600 px-2 py-1 outline-hidden hover:bg-blue-900 duration-500">Confirm</button>
                        
                        <button onClick={(e) => removeFriendHandler({id: item._id})} className="text-white rounded-lg bg-red-600 px-2 py-1 outline-hidden hover:bg-red-900 duration-500">Remove</button>
                    </div>
                </div>
            </div>
        ))}
        </div>) : ( <div>
            <span className="text-lg">No Friend Request Here ! You Can go your Friend List </span>
            <Link className="text-xl text-blue-600" href="/friends">Friends</Link>
        </div>
        )
    )
}