import React, { useState } from 'react'
import Header from '../Common/Header'
import Sidebar from '../Common/Sidebar'
import CommentField from './CommentField'
import DiscussionHeader from './DiscussionHeader'

const MainBoard = () => {
    const [showSidebar, setShowSidebar] = useState(true)

    return (
        <div className="w-screen h-screen bg-gray-50">
            <Header />
            <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
            <div className={`w-full pt-24 transition-all duration-1000 ease-out ${showSidebar ? "pl-72" : "pl-0"}`}>
                <DiscussionHeader />
            </div>
            <div className={`w-full pt-12 transition-all duration-1000 ease-out ${showSidebar ? "pl-72" : "pl-0"}`}>
                <div className="grid grid-cols-2 gap-12 w-11/12 mx-auto">
                    <CommentField />
                    <CommentField />
                </div>
            </div>
        </div>
    )
}

export default MainBoard
