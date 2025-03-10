import Friends from '@/Components/Friends';
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Link from 'next/link';

export default function Sidebar({ userInfo, id }) {
    return (
        <div className='lg:w-[26vw] max-lg:fixed max-lg:left-0 lg:dark:bg-gray-950 max-h-screen'>
            <Link href='/profile' className='flex lg:gap-2 items-center max-lg:justify-center lg:dark:bg-gray-900 lg:bg-gray-50 max-lg:dark:bg-green-900 py-2 px-3'>
                <img
                    className='rounded-full h-10 w-10 border-2 border-green-500 object-cover'
                    src={`../profile/${userInfo?.image ? userInfo.image : "profile.jpg"}`}
                    alt='Profile pic'
                />
                <p className='text-lg capitalize max-lg:hidden dark:text-white' title={userInfo?.name}>{userInfo?.name}</p> 
            </Link>
                
            <div className='h-[90vh] overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full bg-gray-100 dark:bg-gray-950'>
                <div className='lg:w-full flex gap-2 items-center dark:bg-gray-900 mt-0.5 py-1 px-2 max-lg:hidden'>
                    <span className='text-xl'>
                        <MagnifyingGlassIcon className="size-6 dark:text-white" />
                    </span>
                    <input
                        className='w-full outline-none p-2 dark:bg-gray-800 dark:text-white rounded-xl bg-gray-200'
                        type="text"
                        placeholder="Search Here..."
                    />
                </div>
                <Friends id={id} userInfo={userInfo} />
            </div>
        </div>
    )
}