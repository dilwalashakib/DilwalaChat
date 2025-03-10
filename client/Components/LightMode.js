'use client';

import { SunIcon } from "@heroicons/react/24/solid";
import { lighmode } from "@/actions/themeAction";

export default function LightMode() {
    return (
        <button onClick={(e) => lighmode()} className="p-1.5 bg-white hover:bg-blue-200 rounded-full" title="Light">
            <SunIcon className='size-6 dark:text-black' />
        </button>
    )
}