import React, { useState, useEffect } from 'react'
import '../Styles/discussion.css'
import Header from '../Common/Header'
import Sidebar from '../Common/Sidebar'
import Navtrack from './Navtrack'

const MainBoard = () => {
    const [showSidebar, setShowSidebar] = useState(true)
    const [tracks, setTracks] = useState("")
    const [enableAnim, setEnableAnim] = useState(false)

    const def = `"title": "嗨這是測試","endpoint": "UMI";l1"title": "嗨這不是測試","endpoint": "UMI"`

    useEffect(() => {
        console.log(def)
        // setTracks(def)
        setTimeout(() => { setEnableAnim(false) }, 1200)
    }, [showSidebar])


    return (
        <div className="w-screen h-screen overflow-x-hidden overflow-y-auto bg-gray-50" >
            <Header />
            <Sidebar showSidebar={showSidebar} />
            <div className="pt-24 pl-80">
                <h1 className="w-11/12 mx-auto py-8 text-4xl">早安午安晚安</h1>
                {def.split(";l1").map((track, i) => {
                    var thistrack = JSON.parse(`{${track}}`)
                    return (<Navtrack key={i} title={thistrack.title} cardsUrl={thistrack.endpoint} />)
                })}
            </div>

        </div >
    )
}

export default MainBoard
