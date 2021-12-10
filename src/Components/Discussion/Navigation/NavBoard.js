import React, { useState, useEffect } from 'react'
import '../Styles/discussion.css'
import Header from '../Common/Header'
import Sidebar from '../Common/Sidebar'
import Navtrack from './Navtrack'
import WideNavCard from './WideNavCard'

const MainBoard = ({ mode }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [showSidebar, setShowSidebar] = useState(true)
    const [titleText, setTitleText] = useState("")
    const [tracks, setTracks] = useState("")

    useEffect(() => {
        if (mode === "home") {
            fetch('http://127.0.0.1:5500/homeboard', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then(response => { return response.json() })
                .then(response => {
                    setTitleText(`${response.username}早安，以下是你有可能感興趣的議題`)
                    setTracks(response.content.replaceAll("'", '"'))
                    setIsLoading(false)
                })
        }
    })


    return (
        <div className="w-screen h-screen overflow-x-hidden overflow-y-auto bg-gray-50" >
            <Header />
            <Sidebar showSidebar={showSidebar} />
            <div className="pt-24 pl-80">
                <h1 className="w-11/12 mx-auto py-8 text-4xl">{titleText}</h1>
                {(mode === "home" && !isLoading) && tracks.split(";l1").map((track, i) => {
                    var thistrack = JSON.parse(`{${track}}`)
                    return (<Navtrack key={i} title={thistrack.title} cardsUrl={thistrack.endpoint} />)
                })}
                {/* <div className="w-11/12 mx-auto">
                    <WideNavCard carddata={JSON.parse('{"title":"網路自由","tags":"自由;l2媒體","content":"我喜歡123","link":"ghi"}')} />
                </div> */}
            </div>

        </div >
    )
}

export default MainBoard
