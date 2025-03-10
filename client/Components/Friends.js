'use client';

import moment from "moment";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MessengerContext } from "@/context/MessengerContext";
import { CheckCircleIcon as DeliveredIcon } from "@heroicons/react/24/solid";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

export default function Friends({ userInfo, id }) {
    const router = useRouter();
    const { activeUsers, users, setUsers } = useContext(MessengerContext);

    useEffect(() => {
        const getUsers = async() => {
            try {
                const data = await fetch(`${process.env.server}/api/friend/`, {
                    credentials: "include"
                });
                if(data.ok) {
                    const res = await data.json();                
                    setUsers(res)
                    // setFriend(users?.[0]?.user);
                }  
            } catch(err) {
                console.log(err.message);                
            }
        }
        getUsers();
    }, [userInfo]);
    
    return (
        <div className='lg:mt-0.5 flex flex-col max-lg:w-full'>
            {users?.map(({ user, lastMessage }) => (
                <div key={user._id} onClick={() => router.push(`/messages/${user?._id}`)} className={`lg:flex lg:gap-2 items-center justify-between px-2 py-3 cursor-pointer dark:hover:bg-gray-800 hover:bg-gray-300 duration-500 ease-in ${user?._id === id && "dark:bg-gray-800 bg-gray-300"}`}>
                    <div className="lg:flex lg:gap-1.5 lg:items-center">
                        <div className="relative">
                            <img
                                className='rounded-full h-[50px] w-[50px] border-2 dark:border-gray-200 border-green-500 object-cover'
                                src={`../profile/${user?.image ? user.image : 'default.png'}`}
                                alt='Profile pic'
                            />
                     
                            <div className={`${activeUsers[user?._id] ? "bg-[#07fd07]" : "bg-gray-300"} h-3 w-3 rounded-full absolute bottom-0 left-9`}></div>
                        </div>
                        <div className="max-lg:hidden dark:text-white">
                            <h4 className="m-0 p-0">{user.name}</h4>
                            <p>
                                { userInfo?.id === lastMessage?.senderId ? (
                                    <span className="dark:text-green-200 text-sm">You </span>
                                    ) : (
                                    <span className="dark:text-green-100 text-green-800 text-sm">{user.name.split(" ")[0]} </span>
                                )}

                                { lastMessage?.message?.text ? (
                                    <span className={`${lastMessage?.senderId !== userInfo?.id && lastMessage?.status !== "seen" && 'text-red-600 font-semibold text-lg'} `}>
                                        {lastMessage?.message?.text.slice(0, 10)} </span>
                                ) : (
                                    lastMessage?.message?.image ? (
                                        <span className={`${lastMessage?.senderId !== userInfo?.id && lastMessage?.status === "unseen" && ' font-semibold text-lg text-red-600'} `}>send a image </span>
                                    ) : (
                                        <span className="text-sm">connect you </span>
                                    )
                                )}
                                <span className="text-sm dark:text-yellow-500 text-yellow-800">{lastMessage ? moment(lastMessage?.createdAt).startOf('millisecond').fromNow() : moment(user?.createdAt).startOf('millisecond').fromNow()}</span>
                            </p>
                        </div>
                    </div>
                    <div className="max-lg:hidden">
                        {userInfo?.id === lastMessage?.senderId && (
                            lastMessage.status === 'seen' ? (
                                <img className="w-4 h-4 rounded-full object-cover" src={`../profile/${user?.image ? user.image : "default.png"}`} alt="profile image" />
                            ) : (
                                lastMessage.status === "delivered" ? (
                                    <div className="text-xl text-blue-600">
                                        <DeliveredIcon className="size-6 dark:text-blue-300 text-blue-500" />
                                    </div>
                                ) : (
                                    <div className="text-xl text-blue-600">
                                        <CheckCircleIcon className="size-6 dark:text-blue-300 text-blue-500" />
                                    </div>
                                )
                            ) 
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}