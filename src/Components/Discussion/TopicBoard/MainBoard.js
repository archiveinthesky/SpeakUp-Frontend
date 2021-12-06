import React, { useState, useEffect } from 'react'
import '../Styles/discussion.css'
import Header from '../Common/Header'
import Sidebar from '../Common/Sidebar'
import CommentField from './CommentField'
import DiscussionHeader from './DiscussionHeader'

const MainBoard = () => {

    const [showSidebar, setShowSidebar] = useState(true)
    const [enableAnim, setEnableAnim] = useState(false)
    const [flowDisplay, setFlowDisplay] = useState(false);
    const [boardid, setBoardid] = useState()

    useEffect(() => {
        setBoardid(1)
    }, [])

    const toggleSidebar = () => {
        setEnableAnim(true)
        setShowSidebar(!showSidebar)
    }

    const changeCmtViewMethod = (e) => {
        setFlowDisplay(e.target.value === "byflow")
    }

    useEffect(() => {
        setTimeout(() => { setEnableAnim(false) }, 1200)
    }, [showSidebar])

    return (
        <div className="w-screen h-screen overflow-x-hidden overflow-y-auto bg-gray-50" onScroll={() => { document.getElementById("scrollTrigger").click() }}>
            <Header />
            {boardid != null &&
                <div>
                    <Sidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
                    <div className={`w-full pt-24 ${enableAnim ? "transition-padding" : "transition-none"} duration-1000 ease-out ${showSidebar ? "pl-72" : "pl-0"}`}>
                        <DiscussionHeader boardid={boardid} />
                    </div>
                    <div className="w-11/12 mx-auto my-6 flex justify-end">
                        <select className="px-4 h-10 rounded-3xl border-2 border-black" name="viewmethod" onChange={changeCmtViewMethod}>
                            <option value="byside">區分立場</option>
                            <option value="byflow">不區分立場</option>
                        </select>
                    </div>
                    <div className={`w-full ${enableAnim ? "transition-padding" : "transition-none"} duration-1000 ease-out ${showSidebar ? "pl-72" : "pl-0"}`}>
                        {flowDisplay ? <CommentField onSide={null} /> :
                            <div className="grid grid-cols-2 gap-12 w-11/12 mx-auto">
                                <CommentField onSide="支持方" />
                                <CommentField onSide="反對方" />
                            </div>
                        }
                    </div>
                </div>
            }
            <span id="scrollTrigger" />
        </div>
    )
}

export default MainBoard
