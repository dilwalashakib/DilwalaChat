import "./globals.css";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { Inter } from "next/font/google";
import 'react-toastify/dist/ReactToastify.css';
import MessengerProvider from "@/context/MessengerContext";
import CallProvider from "@/context/CallContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dilwala Messenger",
  description: "Generated by Dilwala Shakib",
};

const getUserInfo = async() => {
  const cookie = await cookies();
  const info = cookie.get("userInfo")?.value;
  const theme = cookie.get("theme")?.value;

  if(info) {
      const userInfo = jwtDecode(info);
      return {userInfo, theme}
  }
}

export default async function RootLayout({ children }) {
  const info = await getUserInfo();

  return (
    <html lang="en">
      <body className={`${info?.theme === 'dark' && 'dark'} ${inter.className}`}>
        <MessengerProvider userInfo={info?.userInfo}>
          <CallProvider userInfo={info?.userInfo}>
            {children}
          </CallProvider>
        </MessengerProvider>
      </body>
    </html>
  );
}
