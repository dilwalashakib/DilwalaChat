'use server';

import { cookies } from "next/headers";

export async function darkmode() {
    const cookie = await cookies();
    cookie.set('theme', 'dark');  
}

export async function lighmode() {
    const cookie = await cookies();
    cookie.set('theme', 'light');  
}