import { useParams } from 'react-router-dom'
import BoardContent from './BoardContent'

const BoardPanel = () => {
    const { boardId } = useParams()

    return (
        <div className="w-full h-[calc(100vh-88px)] overflow-y-scroll overflow-scrollbar-hide">
            <h1 className="w-11/12 mx-auto py-8 text-4xl">議題編輯</h1>
            <div className="w-11/12 mx-auto">
                <BoardContent boardId={boardId} />
            </div>
        </div>
    )
}

export default BoardPanel
