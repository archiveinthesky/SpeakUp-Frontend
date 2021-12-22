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
    const [titleText, setTitleText] = useState("")
    const [tracks, setTracks] = useState("")
    const [searchKw, setSearchKw] = useState("")
    const [smallScreen, setSmallScreen] = useState(true)
    const [errorOccured, setErrorOccured] = useState(false)

    const updateScreen = () => {
        setSmallScreen(window.innerWidth < 1280)
    }

    useEffect(() => {
        updateScreen()
        window.onresize = updateScreen
        return window.onresize = null
    }, [])

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
                .catch(error => {
                    let errtxt = `獲取頁面資料時發生錯誤(${error.message})，請重新整理網頁。若錯誤持續發生，請稍待片刻，我們將盡快修復。`
                    setErrorOccured(errtxt)
                })
        }
        if (mode === "search") {
            let searchparams = new URLSearchParams(location.search)
            let keyword = searchparams.has("keyword") ? searchparams.get("keyword") : null
            let tags = searchparams.has("tags") ? searchparams.get("tags") : null
            let searchData = {}
            if (keyword !== null) searchData['keyword'] = keyword
            if (tags !== null) searchData['tags'] = tags
            console.log(searchData)
            if (keyword !== null || tags !== null) {
                fetch('http://127.0.0.1:8000/api/search/', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(searchData)
                })
                    .then(response => { return response.json() })
                    .then(response => {
                        if (response.length === 0) setTitleText("很抱歉，找不到符合您搜尋條件的結果")
                        else if (keyword !== null) setSearchKw(keyword)
                        else if (tags !== null) setSearchKw(`#${tags}`)
                        setTracks(response.map((board) => {
                            return {
                                "title": board.title,
                                "tags": board.tags.replaceAll(",", ";l2"),
                                "content": board.brief,
                                "link": `../discussions/${board.boardId}`,
                                "saved": board.saved
                            }
                        }))
                        setIsLoading(false)
                    })
                    .catch(error => {
                        let errtxt = `獲取頁面資料時發生錯誤(${error.message})，請重新整理網頁。若錯誤持續發生，請稍待片刻，我們將盡快修復。`
                        setErrorOccured(errtxt)
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
                .catch(error => {
                    let errtxt = `獲取頁面資料時發生錯誤(${error.message})，請重新整理網頁。若錯誤持續發生，請稍待片刻，我們將盡快修復。`
                    setErrorOccured(errtxt)
                })
        }
    }, [location.search, mode])


    return (

        <div className="w-screen h-screen overflow-x-hidden overflow-y-auto bg-gray-50" >
            <Header />
            <Sidebar defualtState={!smallScreen} toggleIndent={smallScreen ? (status) => { } : null} />
            <div className={`pt-24 ${smallScreen ? "pl-4" : "pl-80"}`}>
                {errorOccured === false ?
                    <>
                        {searchKw !== "" ?
                            <h1 className="w-11/12 mx-auto py-8 text-4xl">以下是<p className={`inline ${searchKw.charAt(0) === "#" && "text-blue-600"}`}>{searchKw}</p>的搜尋結果</h1> :
                            <h1 className="w-11/12 mx-auto py-8 text-4xl">{titleText}</h1>
                        }
                        {(mode === "home" && !isLoading) && tracks.map((track, i) => {
                            var thistrack = JSON.parse(`{${track}}`)
                            return (<Navtrack key={i} title={thistrack.title} cardsUrl={thistrack.endpoint} />)
                        })}
                        {(mode === "search" && !isLoading) &&
                            <div className="w-11/12 mx-auto flex flex-col gap-4">
                                {tracks.map((track, i) => {
                                    return (<WideNavCard key={i} carddata={track} />)
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
                    </> :

                    <div className="bg-red-200 w-11/12 h-[85vh] mx-auto py-3 flex rounded-xl">
                        <div className='m-auto'>
                            <h1 className='text-center text-3xl text-red-500 font-medium'>錯誤</h1>
                            <p className='my-2 px-6 text-center text-xl text-red-500'>{errorOccured}</p>
                        </div>
                    </div>
                }

            </div>
        </div >

    )
}

export default MainBoard
