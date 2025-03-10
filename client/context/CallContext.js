'use client';

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { MessengerContext } from "./MessengerContext";

// create message context
export const CallContext = createContext();

const CallProvider = ({ children, userInfo }) => {
    const { socket } = useContext(MessengerContext);
    const [call, setCall] = useState(null);
    const rtcRef = useRef(null);

    useEffect(() => {
        if(!rtcRef.current) {
            rtcRef.current = new RTCPeerConnection({
                iceServers: [
                    {
                        urls: 'stun:stun.l.google.com:19302'
                    }
                ]
            })
        }
    }, [])

    useEffect(() => {
        socket?.on('receiveOffer', async({senderId, senderName, receiverId, offer}) => {
            // notification send
            setCall({ senderId, senderName, receiverId });
            console.log('receiver offer');
            console.log(offer);
            
            // save the remote user offer
            await rtcRef.current.setRemoteDescription(new RTCSessionDescription(offer));
            // create new Answer
            const answer = await rtcRef.current.createAnswer();
            await rtcRef.current.setLocalDescription(answer);
        
            socket?.emit('createAnswer', {
                senderId: userInfo.id,
                receiverId: senderId,
                answer
            });                       
        });
    
        socket?.on('receiveAnswer', async({senderId, receiverId, answer}) => {
            console.log('receiveAnswer');
            console.log(answer);
            
            // save the remote user answer
            await rtcRef.current.setRemoteDescription(new RTCSessionDescription(answer));
        });  

        socket?.on('receiveCandidate', async({senderId, receiverId, candidate}) => {
            console.log('receiveCandidate');
            
            console.log(candidate);
            
            // save the remote user answer
            await rtcRef.current.addIceCandidate(new RTCIceCandidate(candidate));        
        });  
           
    }, [socket]);

    return (
        <CallContext.Provider value={{ 
            call,
            socket,
            peer: rtcRef?.current,
            setCall
        }}>        
            {children}
        </CallContext.Provider>
    )
}

export default CallProvider;