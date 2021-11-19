import React, { useState, useEffect } from 'react'
import Header from '../Common/Header'
import Sidebar from '../Common/Sidebar'
import CommentField from './CommentField'
import DiscussionHeader from './DiscussionHeader'
import SubmitComment from './SubmitComment'

const MainBoard = () => {
    const [showSidebar, setShowSidebar] = useState(true)
    const [enableAnim, setEnableAnim] = useState(false)
    const [boardid, setBoardid] = useState(1)

    const toggleSidebar = () => {
        setEnableAnim(true)
        setShowSidebar(!showSidebar)
    }

    useEffect(() => {
        setTimeout(() => { setEnableAnim(false) }, 1200)
    }, [showSidebar])

    return (
        <div className="w-screen h-screen overflow-x-hidden bg-gray-50">
            <Header />
            <Sidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
            <div className={`w-full pt-24 ${enableAnim ? "transition-padding" : "transition-none"} duration-1000 ease-out ${showSidebar ? "pl-72" : "pl-0"}`}>
                <DiscussionHeader boardid={boardid} />
            </div>
            <div className={`w-full pt-12 ${enableAnim ? "transition-padding" : "transition-none"} duration-1000 ease-out ${showSidebar ? "pl-72" : "pl-0"}`}>
                <div className="grid grid-cols-2 gap-12 w-11/12 mx-auto">
                    <CommentField onSide="支持方" />
                    <CommentField onSide="反對方" />
                </div>
            </div>
            {/* <SubmitComment setTypeComment={() => { console.log("Clicked") }} /> */}
        </div>
    )
}

export default MainBoard
