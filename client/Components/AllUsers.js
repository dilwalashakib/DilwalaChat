"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AllUsers() {
    const [users, setUsers] = useState([]);
    const router = useRouter();

    const addFriendHandler = async({ id }) => {
        try {
            const data = await fetch(`${process.env.server}/api/friend/send-request`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({receiverId: id})
            });
            const res = await data.json();
            if(data.ok) {
                toast.success("Send a Friend Request!");
                router.push("/send-request")
            } else {
                toast.error(res.error); 
            }
        } catch(err) {
            console.log(err.message);
            toast.error(err.message);             
        }
    }
    useEffect(() => {
        const getUsers = async() => {
            try {
                const data = await fetch(`${process.env.server}/api/user/`, {
                    credentials: "include"
                });
                if(data.ok) {
                    const res = await data.json();
                    console.log(res);
                    
                    setUsers(res)
                }
            } catch(err) {
                console.log(err.message);                
            }
        }
        getUsers();
    }, []);
    return (
        users?.length > 0 ? (<div className="flex flex-wrap gap-2">
        {users?.map((item) => (
            <div key={item?._id} className="dark:bg-gray-800 bg-white rounded-md p-2 px-2.5">
                <img
                    className='rounded-md h-[130px] w-[130px] object-cover'
                    src={`../profile/${item?.image ? item.image : 'default.png'}`} 
                    alt='Profile pic'
                />
                <div className="text-center mt-1">
                    <h4 className="capitalize">{item?.name.slice(0, 10)}</h4>

                    {false ? (
                        <button disabled className="text-white rounded-lg bg-blue-600 px-2 py-1 outline-hidden hover:bg-blue-800 duration-500 cursor-not-allowed">Request Send</button>
                    ) : (
                        <button onClick={(e) => addFriendHandler({id: item._id})} className="text-white rounded-lg bg-blue-600 px-2 py-1 outline-hidden hover:bg-blue-800 duration-500">Add Friend</button>
                    )}
                </div>

            </div>
        ))}
        </div>) : (
            <div>
                <span className="text-lg">No User Found Here ! You Can go your Friend List </span>
                <Link className="text-xl text-blue-600" href="/friends">Friends</Link>
            </div>
        )
    )
}