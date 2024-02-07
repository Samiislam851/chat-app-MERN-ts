import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../Configs/ContextProvider'
import { IoIosLogOut } from 'react-icons/io'

type Props = {}

const SideBar = (props: Props) => {

    const { user, logOut, loading } = useContext(Context)!
    console.log(user);
    const logOutFunc = async () => {
        if (logOut) {

            await logOut()
        }
    }



    return (
        <div className="flex flex-col max-w-sm h-screen border-e-2 ">
            {/* Top */}
            <div className="flex justify-start px-2 py-2 gap-2 items-center">
                <img src="../logo.png" className="w-10 h-10" alt="logo" />
                <h3 className='text-gray-700 text-2xl font-bold'>ChitChatZ</h3>
            </div>

            {/* Middle */}
            <div className="flex-1 overflow-y-auto">
                {/* Content of the middle section */}
                content
            </div>

            {/* Bottom */}
            <div className="px-3 py-5">
                <div className="flex w-full gap-3 justify-between items-center text-gray-700">
                    <div
                        style={{ backgroundImage: `url(${user?.photoURL})` }}
                        className="w-14 h-14 bg-cover bg-center rounded-full basis-[20%]"
                    >
                        {/* <img src={user?.photoURL!} className="w-full h-full" alt="" /> */}
                    </div>
                    <div className='basis-[60%]'>
                        <h3 className='text-xl font-medium'>{user?.displayName!}</h3>
                        <h4 className='text-sm text-gray-500'>{user?.email}</h4>
                    </div>
                    <button className="text-white basis-[20%]" onClick={logOutFunc}>
                        <IoIosLogOut className="w-8 h-8 text-red-600" />
                    </button>
                </div>
            </div>
        </div>

    )
}

export default SideBar