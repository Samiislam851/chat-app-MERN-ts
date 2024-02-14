import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { Socket, io } from 'socket.io-client'
import { Context } from './ContextProvider'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'
import { MongoUser } from '../types/types'

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
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
    onlineUsers: string[] | null,
    setRequestedPersons: React.Dispatch<React.SetStateAction<MongoUser[]>>,
    requestedPersons: MongoUser[],
}



export const SocketContext = createContext<valueType | null>(null)

const SocketContextProvider = ({ children }: Props) => {

    const { user, requests, setRequests } = useContext(Context)!

    const [socket, setSocket] = useState<WebSocket | Socket | null | any>(null)
    const [messages, setMessages] = useState<Message[]>([])
    const [onlineUsers, setOnlineUsers] = useState<string[] | null>(null)
    const [requestedPersons, setRequestedPersons] = useState<MongoUser[]>([])


    useEffect(() => {
        if (user) {

            const newSocket = io('http://localhost:3000/', { query: { user: user?.email } })
            newSocket.on('connect', () => {
                newSocket?.on('getOnlineUsers', (onlineUsers: string[]) => {
                    setOnlineUsers(onlineUsers)
                })
                setSocket(newSocket)

                console.log('connected to socket server -->', newSocket);
                // socket.on('typing', () => setsTyping(true))

                // socket.on('stop typing', () => setsTyping(false))

            })



            return () => {
                newSocket.disconnect()
                setSocket(null)
            }
        }
    }, [user])




    useEffect(() => {
        socket?.on("message-received", (newMessageReceived: any) => {
            //checking if the message is for this chat 

            if (!window.location.href.includes(newMessageReceived.message.chatId)) {
                // Swal.fire({
                //     position: "top-end",
                //     icon: "info",
                //     title: `${newMessageReceived.sender.split('@')[0]} sent you a message`,
                //     text: `${newMessageReceived.content}....`,
                //     showConfirmButton: false,
                //     timer: 2000
                // });
                console.log(newMessageReceived);


                toast(`${newMessageReceived.senderName} sent : ${newMessageReceived.message.content}`)
            } else {

                console.log('newMessageReceived');
                if (!messages.some(message => message._id == newMessageReceived.message._id)) {
                    setMessages((prevMessages) => [...prevMessages, newMessageReceived.message])
                }



            }

        })




        socket?.on('getOnlineUsers', (onlineUsers: string[]) => {
            setOnlineUsers(onlineUsers)
        })



        socket?.on('request accepted res', (user: any) => {


            console.log('received.................................................!!!!');

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${user.name} just accepted your request`,
                showConfirmButton: false,
                timer: 1500
            });
            console.log('request accepted res hit');


            const otherPersons = requestedPersons.filter(person => person.email == user.email)
            setRequestedPersons(otherPersons)
        })

        socket?.on('send request res', (user: any) => {


            console.log('received.................................................!!!!');

            Swal.fire({
                position: "top-end",
                icon: "info",
                title: `${user.name} sent you a request`,
                showConfirmButton: false,
                timer: 1500
            });
            console.log('request accepted res hit');
            if (requests) {
                setRequests(prev => prev ? [...prev, user.email] : [user.email])
            }

        })



        return () => {
            socket?.disconnect()
        }
    }, [socket])


    console.log('online users', onlineUsers);


    const value: valueType = {
        socket, messages, setMessages, onlineUsers, setRequestedPersons, requestedPersons
    }
    return (
        <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
    )
}

export default SocketContextProvider