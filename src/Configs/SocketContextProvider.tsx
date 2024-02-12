import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { Socket, io } from 'socket.io-client'
import { Context } from './ContextProvider'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'

interface Props {
    children: ReactNode
}



interface Message {
    _id: string,
    chatId: string,
    sender: string,
    content: string,
    timeStamp: Date,
}



interface valueType {
    socket: WebSocket | Socket | null | any,
    messages: Message[],
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>
}



export const SocketContext = createContext<valueType | null>(null)

const SocketContextProvider = ({ children }: Props) => {

    const { user } = useContext(Context)!

    const [socket, setSocket] = useState<WebSocket | Socket | null | any>(null)
    const [messages, setMessages] = useState<Message[]>([])


    useEffect(() => {
        if (user?.email) {

            const newSocket = io('http://localhost:3000/', { query: { user: user?.email } })
            newSocket.on('connect', () => {

                setSocket(newSocket)

                console.log('connected to socket server -->', newSocket);
                // socket.on('typing', () => setsTyping(true))

                // socket.on('stop typing', () => setsTyping(false))

            })
            return () => {
                newSocket.disconnect()
            }
        }
    }, [user])




    useEffect(() => {
        socket?.on("message-received", (newMessageReceived: any) => {
            //checking if the message is for this chat 

            if (!window.location.href.includes(newMessageReceived.chatId)) {
                Swal.fire({
                    position: "top-end",
                    icon: "info",
                    title: `${newMessageReceived.sender.split('@')[0]} sent you a message`,
                    text: `${newMessageReceived.content}....`,
                    showConfirmButton: false,
                    timer: 2000
                });
console.log(newMessageReceived);


                toast(`...${newMessageReceived.sender}`)
            } else {

                console.log('newMessageReceived');
                if (!messages.some( message => message._id == newMessageReceived._id)) {
                    setMessages((prevMessages) => [...prevMessages, newMessageReceived])
                }



            }

        })

        return () => {
            socket?.disconnect()
        }
    }, [socket])





    const value: valueType = {
        socket, messages, setMessages
    }

    return (
        <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
    )
}

export default SocketContextProvider