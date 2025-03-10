import { CheckCircleIcon as DeliveredIcon } from "@heroicons/react/24/solid";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

export default function SendMessage({userInfo, length, currentFriend, index, senderId, status, imgSrc, msg, time}) {
    return (
        <div className="flex flex-col items-end mt-3 mb-1">
            {imgSrc && <img className="w-auto h-56 rounded-xl object-cover" src={imgSrc} alt="Image Message" />}
            {msg && <p className="max-w-96 py-2 px-4 dark:bg-blue-600 bg-blue-950 text-white rounded-2xl text-lg rounded-br-none text-justify mt-1 mr-1">{msg}</p>}
            
            { index === length && senderId === userInfo?.id && (
                status === 'seen' ? (
                    <div className="mt-1 text-xl">
                        <img className="w-4 h-4 rounded-full object-cover" src={`../profile/${currentFriend?.image ? currentFriend.image : "default.png"}`} alt="profile image" />
                    </div>
                ) : (
                    status === 'delivered' ? (
                        <div className="mt-1 text-xl text-blue-500">
                            <DeliveredIcon className="size-6 dark:text-blue-300 text-blue-500" />
                        </div>
                    ) : (
                        <div className="mt-1 text-xl text-blue-500">
                            <CheckCircleIcon className="size-6 dark:text-blue-300 text-blue-500" />
                        </div>
                    )
                )
            )}
            <p className="text-sm dark:text-yellow-300 text-yellow-600">{time}</p>
        </div>
    )
}