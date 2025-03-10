"use client"

import { ChevronDownIcon } from '@heroicons/react/24/solid'

export default function ConversationInfo({ currentFriend }) {
    return (
        <div className='lg:w-[22vw] max-lg:absolute max-lg:top-14 max-lg:right-0 max-lg:h-[82vh] dark:bg-blue-950 bg-gray-100 dark:text-white'>
            <div className='flex gap-2 flex-col items-center relative mt-4'>
                <img
                    className='rounded-full h-28 w-28 border-2 border-sky-600 object-cover'
                    src={`../profile/${currentFriend?.image ? currentFriend.image : 'default.png'}`}
                    alt='Profile pic'
                />
                <h3 className='text-2xl'>{currentFriend?.name}</h3>
            </div>
            <div className='mt-8 p-4 flex flex-col gap-4'>
                <div className='flex gap-2 justify-between'>
                    <p className='text-lg'>Customization Chat</p>
                    <button className='p-1.5 dark:bg-gray-950 bg-blue-600 rounded-full'>
                        <ChevronDownIcon className='size-5 text-white' />
                    </button>
                </div>
                <div className='flex gap-2 justify-between'>
                    <p className='text-lg'>Privacy and Support</p>
                    <button className='p-1.5 dark:bg-gray-950 bg-blue-600 rounded-full'>
                        <ChevronDownIcon className='size-5 text-white' />
                    </button>
                </div>
                <div className='flex gap-2 justify-between'>
                    <p className='text-lg'>Shared Media</p>
                    <button className='p-1.5 dark:bg-gray-950 bg-blue-600 rounded-full'>
                        <ChevronDownIcon className='size-5 text-white' />
                    </button>
                </div>
            </div>
        </div>
    )
}