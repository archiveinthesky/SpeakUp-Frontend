import { useState, useEffect } from 'react'
import Navtrack from "./Navtrack"

const BoardsPanel = () => {
    const [tracks, setTracks] = useState([])

    useEffect(() => {
        setTracks([{
            title: '封閉測試議題',
            endpoint: ''
        }, {
            title: '封閉測試議題',
            endpoint: ''
        }])
    }, [])

    return (
        <div className="w-full h-[calc(100vh-88px)] overflow-y-scroll overflow-scrollbar-hide">
            <h1 className="w-11/12 mx-auto py-6 text-4xl">使用者午安，歡迎回到Speakup管理介面</h1>
            <div>

            </div>
            {tracks.map((track, i) => <Navtrack key={i} title={track.title} cardsUrl={track.endpoint} />)}
        </div>
    )
}

export default BoardsPanel
