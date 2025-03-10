import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

import Sidebar from '@/Components/Sidebar';
import IconBar from "@/Components/IconBar";
// import notificationSound from "./audio/notification.mp3";
// import sendingSound from "@/audio/sending.mp3";

const getUserInfo = async() => {
    const info = cookies().get("userInfo");
    if(info) {
        const userInfo = jwtDecode(info.value);
        return userInfo
    }
}

export default async function Messages(a) {
    console.log(a);
    
    const userInfo = await getUserInfo();
    // const [playNotification] = useSound(notificationSound);
    // const [playSendingSound] = useSound(sendingSound);

    // const [typingMessege, setTypingMessege] = useState('');

    // done hoica------------> const sendMessegeHandler = async(e) => {
    //     e.preventDefault();
    //     playSendingSound();
    //     const sendData = {
    //         senderName: userInfo.name,
    //         receverId: friend._id,
    //         messege: sendMessege ? sendMessege : "❤️"
    //     }
        
    //     const { data } = await axios.post('/api/messenger/messege', sendData);

    //     dispatch({type: "SAVE_SINGLE_MESSEGE", payload: { messege: data.messege }});

    //     socket.current.emit('typingMessege', {
    //         senderId: userInfo._id,
    //         receverId: friend._id,
    //         msg: ''
    //     });
    //     setSendMessege('');
    // }

    // useEffect(() => {
    //     if(messegeSendSuccess) {
    //         socket.current.emit("sendMessege", messege[messege.length - 1]);
    //         dispatch({
    //             type: "UPDATE_LAST_MESSEGE",
    //             payload: {
    //                 messege: messege[messege.length - 1]
    //             }
    //         });
    //         dispatch({type: 'MESSEGE_SEND_SUCCESS'});
    //     }
    // }, [messegeSendSuccess, dispatch, messege]);


    // // Get Socket RealTime Messege
    // useEffect(() => {
    //     socket.current.on("getMessege", (msg) => {
    //         setSocketMessege(msg);
    //     });
    //     socket.current.on("getTypingMessege", (msg) => {
    //         setTypingMessege(msg);
    //     });
    // }, []);


    // Get Socket Seen & Delivered Messege
    // useEffect(() => {
    //     socket.current.on("getSeenMessege", (seenMsg) => {
    //         dispatch({type: "SEEN_MESSEGE", payload: {messege: seenMsg}});
    //     });
    //     socket.current.on("getDeliveredMsg", (deliverdMsg) => {
    //         dispatch({type: "DELIVERED_MESSEGE", payload: {messege: deliverdMsg}})
    //     });
    //     // get new User add
    //     socket.current.on("newUserAdd", (data) => {
    //         dispatch({type: "NEW_USER_ADD", payload: {newUserAdd: data}});
    //     });
    // }, [dispatch]);


    // // Show Messege
    // useEffect(() => {
    //     if(socketMessege.senderId === friend._id && socketMessege.receverId === userInfo._id) {
    //         dispatch({type: "SOCKET_MESSEGE", payload: { messege: socketMessege}});
    //         dispatch({type: "UPDATE_LAST_MESSEGE", payload: {messege: socketMessege, status: 'seen'}});
    //         // Seen Messege
    //         seenMessege(socketMessege);
    //         // Socket Seen Messege Send
    //         socket.current.emit("messegeSeen", socketMessege);
    //     }
    // }, [socketMessege, friend, dispatch, userInfo]);  


    // useEffect(() => {
    //     if(socketMessege.senderId !== friend._id && socketMessege.receverId === userInfo._id) {
    //         playNotification();
    //         toast.success(`${socketMessege.senderName} send a messege.`);
    //         dispatch({type: "UPDATE_LAST_MESSEGE", payload: {messege: socketMessege, status: 'delivered'}});
    //         // Delivered Messege
    //         deliveredMessege(socketMessege);
    //         // Delivered Messege
    //         socket.current.emit("deliveredMessege", socketMessege);
    //     }
    // }, [socketMessege, userInfo, dispatch]);

    
    // const inputMessegeHandler = (e) => {
    //     setSendMessege(e.target.value);
    //     socket.current.emit('typingMessege', {
    //         senderId: userInfo._id,
    //         receverId: friend._id,
    //         msg: e.target.value
    //     }); 
    // }
    // const sendEmojiHandler = (e, emoji) => {
    //     setSendMessege(sendMessege + '' + emoji);
    //     socket.current.emit('typingMessege', {
    //         senderId: userInfo._id,
    //         receverId: friend._id,
    //         msg: emoji
    //     }); 
    // }
    // const logoutHandler = async(e) => {
    //     e.preventDefault();
    //     try {
    //         const { data } = await axios.post('/api/user/logout');
    //         if(data.success) {
    //             socket.current.emit("logout", userInfo._id);
    //             dispatch({type: "LOGOUT"});
    //             localStorage.removeItem('userInfoToken');
    //             toast.success("Logout Success");
    //         }
    //     } catch(err) {
    //         toast.error(err.messege);
    //     }        
    // }
    // const darkTheme = () => {
    //     dispatch({type: "CHANGE_THEME", payload: {theme: "dark"}});
    //     localStorage.setItem("theme", "dark");
    // }
    // const whiteTheme = () => {
    //     dispatch({type: "CHANGE_THEME", payload: {theme: "white"}});
    //     localStorage.setItem("theme", "white");
    // }

    
    // const searchHandler = (e) => {
    //     const searchText = e.target.value.toLowerCase();
    //     const htmlCollection = document.querySelectorAll('#friend');

    //     for(let i = 0; i < users.length; i++) {
    //         const text = users[i].user.name.toLowerCase();

    //         if(text.indexOf(searchText) > -1) {
    //             htmlCollection[i].style.display = ''
    //         } else {
    //             htmlCollection[i].style.display = 'none';
    //         }
    //     }
    // }

    return (
        <div className='flex gap-0.5 bg-gray-950'>
            <IconBar />
            <Sidebar userInfo={userInfo} />

            <div className="flex items-center justify-center text-4xl text-center w-[70vw]">Select a friend</div>
        </div>
    )
}

{/* <div>
            <ToastContainer position="top-right" limit={1} />
            <div>
                 <div>
                    <div className={ theme === 'white' ? 'bg-white-100' : 'bg-black-100'}>
                        <div>
                            <img src={userInfo ? `/images/${userInfo.image}` : ""} alt="" />
                            <h3>{userInfo && userInfo.name.split(' ')[0]}</h3>
                        </div>
                        <div>
                            {/* <button className={theme === 'white' ? "text-xl" : "text-2xl"} onClick={(e) => setPopup(!popup)} >
                                <i className="fa-solid fa-ellipsis"></i>
                            </button>
                            <button className={theme === 'white' ? classes.activeBtn : classes.btn}>
                                <i className="fa-regular fa-pen-to-square"></i>
                            </button>
                        </div>
                    </div>

                    { popup && <div className={theme === 'white' ? `${classes.darkTheme} ${classes.whiteTheme}` : classes.darkTheme}>
                        <div className={classes.darkMode}>
                            <input
                                checked={theme === 'dark'}
                                onChange={darkTheme} 
                                type="checkbox" 
                                id="dark"
                            />
                            <label htmlFor="dark">Dark Mode</label>
                        </div>
                        <div className={classes.whiteMode}>
                            <input
                                checked={theme === "white"}
                                onChange={whiteTheme}  
                                type="checkbox"
                                id="white" 
                            />
                            <label htmlFor="white">Light Mode</label>
                        </div>
                        <div onClick={logoutHandler} className={classes.logout}>
                            <i className="fa-solid fa-right-from-bracket"></i>
                            <span>Logout</span>
                        </div>
                    </div> }

                    <div className={ theme === 'white' ? 'bg-white-100' : 'bg-black-100'}>
                        <span>
                            <i className="fa-sharp fa-solid fa-magnifying-glass"></i>
                        </span>
                        <input
                            type="text"
                            placeholder="Search Here..."
                        />
                    </div>

                    <div>
                        {activeUser.map((userData) => (
                            <ActiveFriend
                                fn={(e) => setFriend(userData.userInfo)}
                                key={userData.userId}
                                imgSrc={`images/${userData.userInfo.image}`}
                            />
                        ))}
                    </div> 
                
                    <Friends userInfo={userInfo} />
                </div>

                {friend ? (
                    <Messege
                        userInfo={userInfo}
                        typingMessege={typingMessege}
                        activeUser={activeUser}
                        currentFriend={friend}
                        setSidebar={setSidebar}
                        sidebar={sidebar}
                        sendMessege={sendMessege}
                        setSendMessege={setSendMessege}
                        fn={sendMessegeHandler}
                        sendImageFn={sendImageHandler}
                        inputMessegeHandler={inputMessegeHandler}
                        sendEmojiHandler={sendEmojiHandler}
                    /> 
                ) : (
                    <div className={classes.noFriends}>No Friends</div>
                ) }

                { sidebar && (
                    <FriendInfo
                        messege={messege}
                        theme={theme}
                        currentFriend={friend} 
                        activeUser={activeUser}
                    />)
                 }
            </div>
       </div> */}