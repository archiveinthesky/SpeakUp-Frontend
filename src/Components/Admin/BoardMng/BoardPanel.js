import BoardContent from './BoardContent'

const BoardPanel = () => {
    return (
        <div className="w-full h-[calc(100vh-88px)] overflow-y-scroll overflow-scrollbar-hide">
            <h1 className="w-11/12 mx-auto py-8 text-4xl">使用者午安，歡迎回到Speakup管理介面</h1>
            <div className="w-11/12 mx-auto">
                <BoardContent />
            </div>
        </div>
    )
}

export default BoardPanel
