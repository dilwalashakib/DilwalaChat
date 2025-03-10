'use client';

import moment from "moment";
import { toast } from "react-toastify";
import { emojiArray } from "@/utils/emoji";
import SendMessage from '@/Components/SendMessage';
import ReceiveMessage from '@/Components/ReceiveMessage';
import { MessengerContext } from "@/context/MessengerContext";
import ConversationInfo from '@/Components/ConversationInfo';
import { useContext, useEffect, useRef, useState } from "react";
import { deliveredMessage, seenMessage } from "@/utils/fetchData";
import { PhoneIcon, VideoCameraIcon, Bars3Icon, DocumentPlusIcon, PhotoIcon, MicrophoneIcon, HeartIcon, PaperAirplaneIcon, FaceSmileIcon, ArrowUpTrayIcon, TrashIcon, PhoneXMarkIcon } from '@heroicons/react/24/solid'
import { lastMessage } from "@/utils/message";
import Link from "next/link";
import { CallContext } from "@/context/CallContext";

export default function Conversation({ userInfo, id }) {
    const scrollRef = useRef();
    const { activeUsers, messages, socket, socketMsg, setMessages, users, setUsers, setSocketMsg } = useContext(MessengerContext);
    const { call } = useContext(CallContext);
   
    const [isInfo, setIsInfo] = useState(false);
    const [isImage, setIsImage] = useState(false);
    const [file, setFile] = useState(null);
    const [currentFriend, setCurrentFriend] = useState('');
    const [emoji, setEmoji] = useState(false);
    const [msg, setMsg] = useState("");

    const sendMsgHandler = async(e, loveMsg) => {
        e.preventDefault();
        // playSendingSound();
        let fetchData = null;

        if(file && msg) {
            // Send Data backend Server
            const formData = new FormData();
            formData.append('senderName', userInfo.name);
            formData.append('receiverId', id);
            formData.append('textMsg', msg);
            formData.append('file', file);

            fetchData = await fetch(`${process.env.server}/api/messages/text-and-image`, {
                method: "POST",
                credentials: "include",
                body: formData
            });
        } else if(msg || loveMsg) {
            fetchData = await fetch(`${process.env.server}/api/messages/message`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    senderName: userInfo?.name,
                    receiverId: id,
                    textMsg: msg ? msg : loveMsg,
                })
            })
        } else if(file) {
            // Send Data backend Server
            const formData = new FormData();
            formData.append('senderName', userInfo.name);
            formData.append('receiverId', id);
            formData.append('file', file);
    
            fetchData = await fetch(`${process.env.server}/api/messages/image`, {
                method: "POST",
                credentials: "include",
                body: formData
            })
        }
        // Show All Data
        const res = await fetchData?.json();
        if(fetchData?.ok) {
            toast.success(res?.success);
            socket.emit('sendMessage', res.message);
            setMessages([...messages, res.message]);
            lastMessage(users, res.message, 'unseen')
            setMsg("");
            setEmoji(false);
            setFile(null);
            setIsImage(false)
        } else {
            toast.error(res?.error);
        }
    }

    const sendEmoji = (e, emoji) => {
        setMsg(msg + '' + emoji);
        // socket.current.emit('typingMessege', {
        //     senderId: userInfo._id,
        //     receverId: friend._id,
        //     msg: emoji
        // }); 
    }

    useEffect(() => {
        if(socketMsg) {
            if(socketMsg?.senderId === id && socketMsg?.receiverId === userInfo.id) {
                setMessages([...messages, {...socketMsg, status: "seen"}]);
                // Last message
                const allUsers = lastMessage(users, socketMsg, 'seen');
                setUsers(allUsers);
                // Seen Messege
                seenMessage(socketMsg);
                // Socket Seen Messege Send
                socket.emit("seenMessage", socketMsg);
                setSocketMsg("")
            } else {
                // Delivered Messege
                deliveredMessage(socketMsg);
                // Socket Delivered Messege Send
                socket?.emit("deliveredMessage", socketMsg);
                // Set Last Message
                const allUsers = lastMessage(users, socketMsg, 'delivered');    
                setUsers([...allUsers]);

                socketMsg?.senderName && toast.success(`${socketMsg?.senderName} message you !`)
            }
        }
    }, [socketMsg, id]);
    
    // Seen & Delivered Message
    useEffect(() => {
        if(socket) {
            socket.on('getSeenMessage', (msg) => {
                // seen last message from my view
                messages[messages.length - 1] = {...msg, status: "seen"}
                setMessages([...messages]);

                // Last Message 
                const allUsers = lastMessage(users, msg, 'seen');
                setUsers(allUsers);
            }); 
            socket.on('getDeliveredMsg', (msg) => {
                // delivered last message from my view
                messages[messages.length - 1] = {...msg, status: "delivered"}
                setMessages([...messages]);

                const allUsers = lastMessage(users, msg, 'delivered');
                setUsers(allUsers);
            });
            
            socket.on("getInitialSeenLastMessage", (msg) => {    
                messages[messages.length - 1] = {...msg, status: "seen"}
                setMessages([...messages]);

                const allUsers = lastMessage(users, msg, 'seen');
                setUsers(allUsers);
            })
        }
    }, [socket, users, messages])

    useEffect(() => {
        const fetchMesseges = async() => {
            try {
                const data = await fetch(`${process.env.server}/api/messages/${id}`, {
                    credentials: "include"
                });
                if(data.ok) {
                    const res = await data.json();                  
                    setCurrentFriend(res?.user);
                    setMessages([...res.message]);

                    // When Socket not connected - initial State
                    const lastMsg = res.message[res.message.length - 1];
                    if(lastMsg?.senderId === id && lastMsg?.receiverId === userInfo.id) {
                        const allUsers = lastMessage(users, lastMsg, 'seen');
                        setUsers(allUsers);
                        // Seen Messege
                        seenMessage(lastMsg);
                        socket?.emit("initialSeenLastMessage", lastMsg);
                    }
                }
            } catch(err) {
                toast.error("Messege Send Error !");
            }
        }
        if(id) {
            fetchMesseges();
        }
    }, [id]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: 'smooth', block: "start"});
    }, [messages]);

    return (
        currentFriend ? (
        <>
        <div className={`${isInfo ? 'lg:w-[48vw] max-lg:ml-16 max-lg:w-full' : 'lg:w-[70vw] max-lg:ml-16 max-lg:w-full'} h-screen dark:text-white relative`}>
            {call?.receiverId && (
                <div className="text-white w-96 bg-gray-900 absolute top-0.5 right-0.5 p-4 rounded-xl">
                    <h3 className="text-xl">{call?.senderName} Call you!</h3>
                    <div className="flex gap-4 mt-2 items-center">
                        <Link href={`/video-call?senderId=${call?.receiverId}&receiverId=${call?.senderId}`} className="bg-green-400 rounded-full p-2">
                            <span className="flex gap-2 items-center justify-center">Accept <PhoneIcon className="size-6 text-green-950" /></span>
                        </Link>
                        <button className="bg-red-500 rounded-full p-2">
                            <span className="flex gap-2 items-center justify-center">Decline <PhoneXMarkIcon className="size-6 text-white" /></span> 
                        </button>
                    </div>
                </div>
            )}
            <div className='w-full flex justify-between items-center dark:bg-blue-950 px-3'>
                <div className='flex items-center gap-3 py-1 relative'>
                    <img
                        className='rounded-full h-12 w-12 border-2 border-blue-500 object-cover'
                        src={`../profile/${currentFriend?.image ? currentFriend.image : 'default.png'}`}
                        alt='Profile pic'
                    />
                    
                    <div className={`${activeUsers[id] ? 'bg-[#07fd07]' : 'bg-gray-200'} h-3 w-3 rounded-full  absolute bottom-2 left-9`}></div>
                    
                    <h3 className='text-xl'>{currentFriend?.name}</h3>
                </div>
                <div className='flex items-center gap-3 cursor-pointer '>
                    <button className='p-2 dark:bg-gray-950 bg-blue-600 rounded-full hover:bg-blue-900 dark:hover:bg-blue-400'>
                        <PhoneIcon className="size-5 text-white" /> 
                    </button>

                    <Link href={`/video-call?senderId=${userInfo?.id}&receiverId=${id}`} className='p-2 dark:bg-gray-950 bg-blue-600 rounded-full hover:bg-blue-900 dark:hover:bg-blue-400'>
                        <VideoCameraIcon className="size-5 text-white" />
                    </Link>

                    <button onClick={(e) => setIsInfo(!isInfo)} className='p-2 dark:bg-gray-950 bg-blue-600 rounded-full hover:bg-blue-900' title="Conversation Info">
                        <Bars3Icon className="size-5 text-white" />
                    </button>
                </div>
            </div>

            <div className={`h-[83vh] dark:bg-gray-800 bg-gray-200 overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`} onClick={(e) => setEmoji(false)}>
                {messages?.map((msg, i) => (
                    msg.senderId === userInfo.id ? (
                        <div key={msg._id} ref={scrollRef}>
                            <SendMessage
                                index={i}
                                length={messages.length - 1}
                                theme="white"
                                userInfo={userInfo}
                                msg={msg?.message?.text}
                                imgSrc={msg?.message?.image && `/images/${msg?.message?.image}`}
                                senderId={msg?.senderId}
                                status={msg?.status}
                                time={moment(msg.createdAt).startOf("millisecond").fromNow()}
                            />
                        </div>
                    ) : (
                        <ReceiveMessage
                            key={msg._id}
                            theme="white"
                            msg={msg?.message?.text}
                            imgSrc={msg?.message?.image && `/images/${msg?.message?.image}`}
                            avatarSrc={`../profile/${currentFriend?.image ? currentFriend.image : "default.png"}`}
                            time={moment(msg.createdAt).startOf('millisecond').fromNow()}
                        />
                    )
                ))}
            </div>

            <div className='flex gap-2 items-center justify-between w-full dark:bg-blue-950 px-3 py-1 relative'>
                <div className={`flex gap-3 items-center text-xl`}>

                    <button className="dark:bg-gray-950 bg-blue-600 p-2 rounded-full hover:bg-blue-950">
                        <DocumentPlusIcon className="size-5 text-white" />
                    </button>

                    <button onClick={() => setIsImage(!isImage)} className="dark:bg-gray-950 bg-blue-600 p-2 rounded-full hover:bg-blue-950">
                        <PhotoIcon className="size-5 text-white" />
                    </button>

                    <button className="dark:bg-gray-950 bg-blue-600 p-2 rounded-full hover:bg-blue-950">
                        <MicrophoneIcon className="size-5 text-white" />
                    </button>
                </div>
                
                <div className={`w-full relative`}>
                    <input
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)}
                        className={`py-1.5 px-4 rounded-3xl outline-none w-full dark:bg-gray-950 bg-gray-300 dark:text-white text-lg lg:pr-10`}
                        placeholder='type a message...'
                    />
                    <button onClick={(e) => setEmoji(!emoji)} className='text-2xl absolute top-2 right-2'>
                        <FaceSmileIcon className="size-6 dark:text-yellow-400 text-yellow-700 hover:text-yellow-600" />
                    </button>

                    {emoji && <div className="w-80 dark:bg-gray-700 bg-white p-2 absolute bottom-12 right-2 text-2xl rounded-2xl">
                        {emojiArray?.map((item) => (
                            <span
                                className="p-1 m-1 rounded-full cursor-pointer hover:bg-gray-950 inline-block"
                                key={ Math.random() * 9999 }  
                                onClick={(e) => sendEmoji(e, item)}
                            > 
                                {item} 
                            </span>
                        ))}
                    </div>}
                </div>

                {isImage && <div className={`${isInfo ? 'w-8/12': 'w-6/12'} dark:bg-gray-950 bg-white p-3 rounded-xl absolute bottom-14 right-20`}>
                    <div className='w-full h-16 border-dashed border-2 rounded-sm' >
                        <label htmlFor="file" className="cursor-pointer dark:bg-gray-900 w-full h-full flex items-center justify-center dark:hover:bg-gray-950 hover:bg-gray-200">
                            <ArrowUpTrayIcon className="size-7 dark:text-white" />
                        </label>
                        <input id="file" type="file" accept=".jpg, .jpeg, .png" onChange={(e) => setFile(e.target.files[0])} hidden />
                    </div>
                    {file && <div className='flex gap-2 mt-4'>
                        <div className='relative w-56 h-40'>
                            <img className='w-56 h-40 object-cover rounded-xl' src={URL.createObjectURL(file)}/>
                            <button onClick={(e) => setFile(null)}>
                                <TrashIcon className='size-8 text-red-600 dark:bg-gray-950 bg-white p-1 rounded-full absolute top-2 right-2 hover:bg-red-500 hover:text-gray-950' />
                            </button>
                        </div>
                        <div>
                            <p className='text-green-600 text-lg'>Name: {file.name}</p>
                            <p className='text-green-600 text-lg'>Type: {file.type}</p>
                            <p className='text-green-600 text-lg'>Size: {(file.size / 1024).toFixed(2)} kb</p>
                        </div>              
                    </div>}
                </div>}
                <div className={`text-2xl flex items-center`}>
                    { msg || isImage ? (
                        <button onClick={sendMsgHandler} className='dark:bg-gray-950 bg-blue-800 p-2 rounded-lg'>
                            <PaperAirplaneIcon className="size-6 text-blue-400 hover:text-blue-600" />
                        </button>
                    ) : (
                        <button onClick={(e) => sendMsgHandler(e, '❤')} className="dark:bg-gray-950 bg-red-950 p-2 rounded-lg">
                            <HeartIcon className="size-6 text-red-600 hover:text-red-700" />
                        </button>
                    )}
                </div>
            </div>
        </div>

        {isInfo && <ConversationInfo currentFriend={currentFriend} />}
        </>
        ) : (
            <div className="flex w-[70vw] justify-center items-center text-2xl h-screen dark:bg-blue-950 dark:text-white">Select Your Friend</div>
        )
    )
}