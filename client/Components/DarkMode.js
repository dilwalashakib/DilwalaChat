'use client';

import { darkmode } from "@/actions/themeAction";
import { MoonIcon } from "@heroicons/react/24/solid";

export default function DarkMode() {
    return (
        <button onClick={(e) => darkmode()} className="p-1.5 bg-gray-950 hover:bg-gray-800 rounded-full" title="Dark">
            <MoonIcon className='size-6 text-white' />
        </button>
    )           
}