import React, { useContext } from 'react'
import { Context } from '../../Configs/ContextProvider'

type Props = {}

const SideBar = (props: Props) => {

    const { user, logOut, loading } = useContext(Context)!

    const logOutFunc = async () => {
        if (logOut) {

            await logOut()
        }
    }

    return (
        <div className='max-w-sm min-h-screen md:px-10 border-e-2 flex-col'>
            {/* top */}
            <div>
                <img src="../logo.png" className='w-[50px] h-[50px]' alt="logo" />
            </div>
            {/* mid */}
            <div className='flex-1'>
aspfdovjnaps;d
            </div>
            {/* Bottom */}
            <div className='flex-grow' >
                <button className="bg-red-600 text-white p-3 " onClick={logOutFunc}>Log Out</button>
            </div>

        </div>
    )
}

export default SideBar