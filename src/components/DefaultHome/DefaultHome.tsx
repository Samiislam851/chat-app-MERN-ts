import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../Configs/ContextProvider'

type Props = {}

const DefaultHome = (props: Props) => {
const [name, setName] = useState<string | null>(null)
  const { user } = useContext(Context)!


  useEffect(() => {
 setName(user?.displayName!)
  }, [user])
  


  return (
    <div className='flex justify-center items-center min-h-[80%]'>

    <h3 className='text-gray-300 font-thin text-xl md:text-4xl text-center'>Welcome to chitchatz {name&& name} 🥳</h3>


    </div>
  )
}

export default DefaultHome