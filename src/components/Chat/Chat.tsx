import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { Context } from '../../Configs/ContextProvider'

type Props = {}
type inputObject = {
  message: string,
}
const Chat = (props: Props) => {
  const { chatId } = useParams()
  const { user } = useContext(Context)!

  console.log('chatId', chatId);

  const { register, handleSubmit, reset } = useForm<inputObject>();


  useEffect(() => {
    axios.get(`http://localhost:3000/messages/${chatId}`, { headers: { Authorization: `Bearer ${localStorage.getItem('chat-app')}` } }).then(res => console.log(res.data)).catch(err => console.log(err))
  }, [])

  const onSubmit = async (data: inputObject) => {
    try {

      await axios.post(
        `http://localhost:3000/send-message/${chatId}`,
        {
          message: data.message,
          sender: user?.email
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem('chat-app')}` } }
      );

      // Log success and reset the form
      console.log('Message sent:', data.message);
      reset();
    } catch (error) {
      // Log and handle the error
      console.error('Error sending message:', error);
    }
  };


  return (
    <div className="flex flex-col h-screen">
    <div className="flex-1 overflow-auto">
      {/* Chat messages container */}
      Chat
    </div>
  
    <div className="mt-auto">
      {/* Send message form */}
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto flex gap-2 items-center justify-center">
        {/* Input field with register hook */}
        <input
          type="text"
          {...register('message')} // Register input with name 'message'
          placeholder="Enter your message"
          className="border rounded-md p-2 w-full"
        />
        {/* Submit button */}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-blue-600 transition-colors duration-300">
          Send
        </button>
      </form>
    </div>
  </div>
  )
}

export default Chat