export default function ReceiveMessage({theme, imgSrc, avatarSrc, msg, time, scrollRef}) {
    return (
        <div ref={scrollRef} className="mt-2 mb-1 ml-1">
            <div className="flex gap-1 items-start">
                <img className="w-12 h-12 rounded-full border-2 border-green-700" src={avatarSrc} alt="avatar" />
                <div>
                    {imgSrc && <img className="w-auto h-56 rounded-xl object-cover" src={imgSrc} alt="Image Message" />}
                    {msg && <p className="max-w-96 py-2 px-4 dark:bg-gray-600 bg-white rounded-2xl mt-1 text-lg text-justify rounded-tl-none">{msg}</p>}
                </div>
            </div> 
            <p className="text-sm dark:text-yellow-300 text-yellow-600 ml-14">{time}</p>
        </div>
    )
}