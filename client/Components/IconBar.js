import Link from "next/link";
import DarkMode from "./DarkMode";
import { ArrowRightStartOnRectangleIcon, ChatBubbleLeftRightIcon, UserCircleIcon, UserGroupIcon, UserIcon, UserPlusIcon, UsersIcon } from "@heroicons/react/24/solid";
import LightMode from "./LightMode";

export default function IconBar({ slugName, theme, userImage }) { 
    return (
        <div className='max-lg:hidden dark:bg-slate-900 bg-white h-screen pt-1 flex flex-col items-center justify-between lg:w-[4vw]'>
            <div className="flex flex-col gap-1">
                <Link href='/profile' className={`${slugName === 'profile' && 'bg-blue-600 text-white'} hover:bg-blue-600 hover:text-white p-2 rounded-lg border-2 border-blue-100 dark:border-gray-800`} title='profile'>
                    {userImage ? (
                        <img src={`../profile/${userImage}`} className="rounded-full w-6 h-6" />
                    ) : (
                        <UserCircleIcon className='size-6 dark:text-white' />
                    )}
                </Link>

                <Link href='/users' className={`hover:bg-blue-600 hover:text-white p-2 rounded-lg border-2 border-blue-100 dark:border-gray-800 ${slugName === 'users' && 'bg-blue-600 text-white'}`}>
                    <UserGroupIcon className='size-6 dark:text-white' />
                </Link>

                <Link href='/messages' className={`hover:bg-blue-600 hover:text-white p-2 rounded-lg border-2 border-blue-100 dark:border-gray-800 ${slugName === 'messages' && 'bg-blue-600 text-white'}`}>
                    <ChatBubbleLeftRightIcon className='size-6 dark:text-white' />
                </Link>

                <Link href='/friend-request' className={`hover:bg-blue-600 hover:text-white p-2 rounded-lg border-2 border-blue-100 dark:border-gray-800 ${slugName === 'friend-request' && 'bg-blue-600 text-white'}`}>
                    <UserPlusIcon className='size-6 dark:text-white' />
                </Link>

                <Link href='/send-request' className={`hover:bg-blue-600 hover:text-white p-2 rounded-lg border-2 border-blue-100 dark:border-gray-800 ${slugName === 'send-request' && 'bg-blue-600 text-white'}`}>
                    <UserIcon className='size-6 dark:text-white' />
                </Link>

                <Link href='/friends' className={`hover:bg-blue-600 hover:text-white p-2 rounded-lg border-2 border-blue-100 dark:border-gray-800 ${slugName === 'friends' && 'bg-blue-600 text-white'}`}>
                    <UsersIcon className='size-6 dark:text-white' />
                </Link>
            </div>
            <div className="flex flex-col gap-2 items-center mb-2">
                { theme === 'dark' ? (
                    <LightMode />
                ) : (
                    <DarkMode />
                )}

                <button className='bg-red-600 hover:bg-red-700 p-2 rounded-lg' title='LogOut'>
                    <ArrowRightStartOnRectangleIcon className='size-6 text-white' />
                </button>
            </div>
        </div>
    )
}