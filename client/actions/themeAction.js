'use server';

import { cookies } from "next/headers";

export async function darkmode() {
    cookies().set('theme', 'dark');  
}

export async function lighmode() {
    cookies().set('theme', 'light');  
}