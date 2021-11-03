import React from 'react'
import Header from '../Common/Header'
import Sidebar from '../Common/Sidebar'

const MainBoard = () => {
    return (
        <div className="w-screen h-screen bg-gray-50">
            <Header />
            <Sidebar showSidebar={true} />
        </div>
    )
}

export default MainBoard
