import { useEffect, useState } from 'react'
import BoardComments from './BoardComments'

const ModPanel = () => {
    const [problemBoards, setProblemBoards] = useState([])

    useEffect(() => {
        setProblemBoards([1, 3])
    }, [])

    return (
        <div className="w-full h-[calc(100vh-88px)] overflow-y-scroll scrollbar-hide">
            <h1 className="w-11/12 mx-auto py-8 text-4xl">使用者午安，歡迎回到Speakup管理介面</h1>
            <div className="w-full mx-auto mb-16 flex flex-col items-center gap-16">
                {problemBoards.map((id, i) =>
                    <BoardComments key={i} boardId={id} />)
                }
            </div>
        </div>
    )
}

export default ModPanel
