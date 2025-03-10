'use client';

import { CallContext } from "@/context/CallContext";
import { MicrophoneIcon, PhoneXMarkIcon, VideoCameraIcon, VideoCameraSlashIcon } from "@heroicons/react/24/solid";
import { useContext, useEffect, useRef, useState } from "react";

export default function VideoCall({ senderId, receiverId, userInfo }) {
    const { peer, socket } = useContext(CallContext);
    const [mute, setMute] = useState(false);
    const [camera, setCamera] = useState(false);
    const meRef = useRef();
    const friendRef = useRef();

    const cancelCallHandler = async(e) => {
        meRef.current?.srcObject?.getTracks()?.forEach(track => track.stop());
        window.open(`/messages/${receiverId}`);
        
        setTimeout(() => {
            window.close();
        }, 1000);
    }
    
    const muteHandler = () => {
        if(mute) {
            meRef.current?.srcObject?.getAudioTracks()?.forEach(track => track.enabled = true);
            setMute(false)
        } else {
            meRef.current?.srcObject?.getAudioTracks()?.forEach(track => track.enabled = false)
            setMute(true);
        }
    }

    const cameraHandler = () => {
        if(camera) {
            meRef.current?.srcObject?.getVideoTracks()?.forEach(track => track.enabled = true);
            setCamera(false)
        } else {
            meRef.current?.srcObject?.getVideoTracks()?.forEach(track => track.enabled = false)
            setCamera(true);
        }
    }

    useEffect(() => {
        if(socket) {
            const cameraAccess = async() => {
                const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
                meRef.current.srcObject = stream;
                meRef.current.muted = true;

                // add audio and video tracks
                stream?.getTracks()?.forEach((track) => {
                    peer?.addTrack(track, stream); 
                });
                // create an offer
                const offer = await peer.createOffer();
                await peer.setLocalDescription(offer);

                // send offer socket server
                socket.emit('createOffer', {
                    senderId: userInfo.id,
                    senderName: userInfo.name,
                    receiverId,
                    offer
                });
            }
            cameraAccess();
        }
    }, [socket]);

    useEffect(() => {
        if(peer) {
            // icecandidate event listener
            peer.onicecandidate = function(data) {
                console.log('candidate');
                if(data.candidate) {
                    socket.emit('sendCandidate', { 
                        senderId: userInfo.id,
                        receiverId,
                        candidate: data.candidate
                    });
                }   
            }
            // get remote video stream
            peer.ontrack = function(data) {
                console.log('final data stream other people');
                console.log(data);
                friendRef.current.srcObject = data?.streams[0];
            }
        }
    }, [peer]);

    return (
        <div className="bg-gray-100 dark:bg-gray-950 w-full relative">
            <video
                ref={friendRef}
                autoPlay 
                className="w-full h-screen object object-cover"
                muted
            />

            <video 
                ref={meRef}
                className="absolute bottom-0 right-0 w-96 h-60 border-2 rounded-xl object-cover"
                autoPlay
            />
            <div className="absolute bottom-2 w-full flex justify-center items-center gap-3">
                { mute ? (
                    <button onClick={muteHandler} className="dark:bg-gray-100 bg-gray-300 rounded-full p-2">
                        <img src="/mutemicrophone.png" className="w-6 h-6 object-cover" />
                    </button>
                ) : (
                    <button onClick={muteHandler} className="bg-gray-800 rounded-full p-2">
                        <MicrophoneIcon className="size-6 text-white" />
                    </button>
                )}

                { camera ? (
                    <button onClick={cameraHandler} className="dark:bg-gray-100 rounded-full p-2 bg-gray-300">
                        <VideoCameraSlashIcon className="size-6 text-black" />
                    </button>
                ) : (
                    <button onClick={cameraHandler} className="bg-gray-800 rounded-full p-2">
                        <VideoCameraIcon className="size-6 text-white" />
                    </button>
                )}

                <button onClick={cancelCallHandler} className="bg-red-500 rounded-full p-2">
                    <PhoneXMarkIcon className="size-6 text-white" />
                </button>
                
            </div>
        </div>
    )
}