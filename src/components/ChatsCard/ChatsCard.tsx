
import React, { useContext, useEffect, useState } from 'react'
import { MongoUser } from '../../types/types';
import axios from 'axios';
import { Context } from '../../Configs/ContextProvider';
import toast from 'react-hot-toast';
import { VscLoading } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

type Props = {
    chat: any,

}

const ChatsCard = ({ chat }: Props) => {

    const { user } = useContext(Context)!
    console.log(chat);


    const [loading, setLoading] = useState(false)
    // const [loadingCancel, setLoadingCancel] = useState(false)
    // const [user2, setUser2] = useState<MongoUser | null>(chat.)

    const navigate = useNavigate()

    // const otherUser = chat.users.filter((fetchedUser: String) => fetchedUser !== user?.email)
    const chatfunc = async () => {
        navigate('/dashboard/chat/' + chat.chat._id)

    }









    const date = new Date(chat?.chat.lastMessage.timeStamp)





    return (
        <div onClick={chatfunc}  className='cursor-pointer flex items-center justify-between border-t  p-2 bg-white rounded-lg mt-2'>
            <div className="basis-1/2 flex gap-2">
                <div style={{ backgroundImage: `url('${chat?.photoURL}')` }} className='w-[50px] overflow-hidden rounded-full h-[50px] hover:scale-[5] md:hover:scale-[3] md:hover:ms-[-110px] md:hover:me-[100px]  hover:translate-x-24 transition-all ease-in-out duration-300 border  border-gray-300 flex justify-center items-center bg-cover bg-center'>
                    {/* <img src={image ? image : ''} className='w-full ' alt={name ? name : ''} /> */}

                </div>
                <div className="">
                    <h3 className='text-gray-500 text-lg'>{chat?.name}</h3>
                    <h3 className='text-gray-500 text-xs'>{chat?.chat.lastMessage.sender == user?.email ? 'You' : `${chat.name}`} :  {chat?.chat.lastMessage.content.substring(0, 15)}</h3>
                </div>
            </div>

            <div className="basis-1/2">
                <div className='flex flex-col justify-end items-end gap-2'>


                    <div>
                        <p className='text-xs text-gray-400 me-2'>
                            {date.toLocaleString()}
                        </p>
                    </div>
                    <button className='text-[#4566d1] text-white px-2 py-1 rounded float-end hover:scale-105 transition-all text-xs font-medium ease-in-out duration-300 '>{loading ? <><VscLoading className='inline text-lg animate-spin' /> </> : <> <span>Continue Chatting</span>  <FaArrowRight className='inline' /> </>}</button>
                </div>

            </div>

        </div>
    )
}

export default ChatsCard
