
import React, { useContext, useState } from 'react'
import { MongoUser } from '../../types/types';
import axios from 'axios';
import { Context } from '../../Configs/ContextProvider';
import toast from 'react-hot-toast';
import { VscLoading } from 'react-icons/vsc';
import { SocketContext } from '../../Configs/SocketContextProvider';

type Props = {
    searchUser: MongoUser,
    dbUser: MongoUser | null,
    setDbUser: React.Dispatch<React.SetStateAction<MongoUser | null>>
}

const SearchedPeopleCard = ({ searchUser, dbUser, setDbUser }: Props) => {
    console.log('.,...dADVASDVA.S D.......', dbUser);

    const { user, logOut } = useContext(Context)!
    const { socket } = useContext(SocketContext)!
    // Update the destructure to use searchUser
    const { photoURL, name, _id, email } = searchUser;
    const [loading, setLoading] = useState(false)



    const addFriend = async () => {

        try {
            setLoading(true)
            const res = await axios.post(`/send-request?user1email=${user?.email}&&user2email=${email}`, { user }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('chat-app')}`
                }
            })

            if (res.status == 200) {


                setDbUser(res.data.user)
                const data = {
                    user1name: user?.displayName,
                    user1Email: user?.email,
                    user2Email: email
                }
                
                socket.emit('send request', data)


            }

            toast.success(res.data.message);

        } catch (error: any) {
            console.log(error);
            if (error.response.status == 401) logOut()
        } finally {
            setLoading(false)
        }



    }
    const cancelRequest = async () => {

        try {
            setLoading(true)
            const res = await axios.post(`/cancel-request-from-requester?user1email=${user?.email}&&user2email=${email}`, { user }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('chat-app')}`
                }
            })

            if (res.status == 200) {


                setDbUser(res.data.user)
            }

            toast.success(res.data.message);

        } catch (error: any) {
            console.log(error);
            if (error.response.status == 401) logOut()

        } finally {
            setLoading(false)
        }

    }



    return (
        <div className='flex items-center justify-between border-t border-gray-500 bg-white bg-opacity-15 border-s  p-2 backdrop-blur-[2px]  rounded-lg mt-2   transition-all ease-in-out  duration-300 '>
            <div className="basis-1/2 flex gap-2">
                <div style={{ backgroundImage: `url('${photoURL}')` }} className='w-[50px] overflow-hidden rounded-full h-[50px] hover:scale-[5] md:hover:scale-[5] md:hover:ms-[-110px] md:hover:me-[200px]  hover:translate-x-24 transition-all ease-in-out duration-300 border  border-gray-300 flex justify-center items-center bg-cover bg-center z-[1000] backdrop-blur-xl'>
                    {/* <img src={image ? image : ''} className='w-full ' alt={name ? name : ''} /> */}

                </div>
                <div className="">
                    <h3 className='text-gray-200 text-lg'>{name}</h3>
                    <h3 className='text-gray-300 text-xs'>{email}</h3>
                </div>
            </div>

            <div className="basis-1/2">

                {dbUser?.pendingRequests!.includes(email) && <>
                    <button onClick={cancelRequest} className='bg-[#365486] text-white px-3 py-1 rounded float-end hover:scale-105 transition-all ease-in-out duration-300 opacity-50 hover:shadow-lg'>{loading ? <><VscLoading className='inline text-lg animate-spin' /> </> : <>Request Sent</>}  </button>
                </>}
                {dbUser?.friends!.includes(email) && <>
                    <button disabled className='text-[#cecece] text-white px-3 py-1 rounded float-end transition-all ease-in-out duration-300  '>{loading ? <><VscLoading className='inline text-lg animate-spin' /> </> : <>Already Friends</>}  </button>
                </>}
                {!dbUser?.pendingRequests!.includes(email) && !dbUser?.friends!.includes(email) && <>
                    <button onClick={addFriend} className='bg-[#365486] text-white px-3 py-1 rounded float-end hover:scale-105 transition-all ease-in-out duration-300 hover:shadow-lg'>{loading ? <><VscLoading className='inline text-lg animate-spin' /> </> : <>  Add friend</>}</button>
                </>}


            </div>

        </div>
    )
}

export default SearchedPeopleCard
