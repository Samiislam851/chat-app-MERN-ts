import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../../components/SideBar/SideBar'

type Props = {}

const Dashboard = (props: Props) => {
    return (
        <div className='flex'>

            <div className="basis-1/2">
               <SideBar/>
            </div>

            <div className="basis-1/2">

                <Outlet />

            </div>
        </div>
    )
}

export default Dashboard