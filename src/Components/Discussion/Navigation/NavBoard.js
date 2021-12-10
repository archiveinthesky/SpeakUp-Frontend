import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import '../Styles/discussion.css'
import Header from '../Common/Header'
import Sidebar from '../Common/Sidebar'
import Navtrack from './Navtrack'
import WideNavCard from './WideNavCard'

const MainBoard = ({ mode }) => {
    const location = useLocation()

    const [isLoading, setIsLoading] = useState(true)
    const [showSidebar, setShowSidebar] = useState(true)
    const [titleText, setTitleText] = useState("")
    const [tracks, setTracks] = useState("")
    const [searchKw, setSearchKw] = useState("")

    useEffect(() => {
        setSearchKw("")
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
                    let d = new Date()
                    let timegreeting = (d.getHours() > 19 || d.getHours() <= 4) ? "晚安" : (d.getHours() < 12) ? "早安" : "午安"
                    setTitleText(`${response.username}${timegreeting}，以下是你有可能感興趣的議題`)
                    setTracks(response.content.replaceAll("'", '"'))
                    setIsLoading(false)
                })
        }
        if (mode === "search") {
            let searchparams = new URLSearchParams(location.search)
            let keyword = searchparams.has("keyword") ? searchparams.get("keyword") : null
            let tags = searchparams.has("tags") ? searchparams.get("tags") : null

            if (keyword !== null || tags !== null) {
                fetch('http://127.0.0.1:5500/searchres', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                })
                    .then(response => { return response.json() })
                    .then(response => {
                        if (keyword !== null) setSearchKw(keyword)
                        else if (tags !== null) setSearchKw(`#${tags}`)
                        else if (response.cards !== "") setTitleText("很抱歉，找不到符合您搜尋條件的結果")
                        setTracks(response.cards.replaceAll("'", '"'))
                        setIsLoading(false)
                    })
            } else {
                window.location.href = "/searcherror"
            }
        }
        if (mode === "collections") {
            fetch('http://127.0.0.1:5500/collections', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then(response => { return response.json() })
                .then(response => {
                    setTitleText("您的收藏")
                    setTracks(response.cards.replaceAll("'", '"'))
                    setIsLoading(false)
                })
        }
    }, [])


    return (
        <div className="w-screen h-screen overflow-x-hidden overflow-y-auto bg-gray-50" >
            <Header />
            <Sidebar showSidebar={showSidebar} />
            <div className="pt-24 pl-80">
                {searchKw !== "" ?
                    <h1 className="w-11/12 mx-auto py-8 text-4xl">以下是<p className={`inline ${searchKw.charAt(0) === "#" && "text-blue-600"}`}>{searchKw}</p>的搜尋結果</h1> :
                    <h1 className="w-11/12 mx-auto py-8 text-4xl">{titleText}</h1>
                }
                {(mode === "home" && !isLoading) && tracks.split(";l1").map((track, i) => {
                    var thistrack = JSON.parse(`{${track}}`)
                    return (<Navtrack key={i} title={thistrack.title} cardsUrl={thistrack.endpoint} />)
                })}
                {(mode === "search" && !isLoading) &&
                    <div className="w-11/12 mx-auto flex flex-col gap-4">
                        {tracks.split(";l1").map((track, i) => {
                            return (<WideNavCard key={i} carddata={JSON.parse(`{${track}}`)} />)
                        })}
                    </div>
                }
                {(mode === "collections" && !isLoading) &&
                    <div className="w-11/12 mx-auto flex flex-col gap-4">
                        {tracks.split(";l1").map((track, i) => {
                            return (<WideNavCard key={i} carddata={JSON.parse(`{${track}}`)} />)
                        })}
                    </div>
                }

            </div>
        </div >
    )
}

export default MainBoard
