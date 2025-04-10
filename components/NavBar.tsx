import React from 'react'
import cls from "classnames"
import Link from 'next/link'
import Image from 'next/image'
import { useAuthDispatch, useAuthState } from '@/context/auth'
import axios from 'axios'

const NavBar: React.FC = () => {
    const { loading, authenticated } = useAuthState();
    const dispatch = useAuthDispatch();

    const handleLogOut = () => {
        axios.post("/auth/logout")
            .then(() => {
                dispatch("LOGOUT");

                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div className="fixed inset-x-0 top-0 z-10 flex items-center justify-between h-12 px-5 bg-white">
            <span className="text-2xl font-semibold text-gray-400">
                <Link href="/">
                    <Image 
                        src="/Reddit-Logo.wine.png"
                        alt="logo"
                        width={120}
                        height={60}
                     >
                        
                     </Image>
                </Link>
            </span>

            <div className="max-w-full px-4">
                <div className="relative flex items-center bg-gray-100 border rounded hover:border-gray-700 hover:bg-white">
                    <i className='fas fa-search ml-2 text-gray-400'></i>
                    <input
                        type="text"
                        placeholder="Search Reddit"
                        className="px-3 py-1 bg-transparent h-7 rounded focus:outline-none"
                    />
                </div>
            </div>

            <div className="flex">
                {!loading && (
                    authenticated ? (
                        <button
                            className="w-20 px-2 mr-2 text-sm h-7 text-center text-white bg-gray-400 rounded"
                            onClick={handleLogOut}
                        >
                            로그아웃
                        </button>
                    ) : (<>
                        <Link href="/login" className="w-20 px-2 pt-1 mr-2 text-sm h-7 text-center text-blue-500 border border-blue-500 rounded">
                            로그인
                        </Link>
                        <Link href="/register" className="w-20 px-2 pt-1 mr-2 text-sm h-7 text-center text-white bg-gray-400 rounded">
                            회원가입
                        </Link>
                    </>)
                )}
            </div>
        </div>
    )
}

export default NavBar
