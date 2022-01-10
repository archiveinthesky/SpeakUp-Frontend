import UserAnalytics from './UserAnalytics'
import PendingBoards from './PendingBoards'

const HomePanel = () => {
    return (
        <div className="w-full h-[calc(100vh-88px)] overflow-y-scroll overflow-scrollbar-hide">
            <h1 className="w-11/12 mx-auto py-6 text-4xl">使用者午安，歡迎回到Speakup管理介面</h1>
            <div className='w-11/12 mx-auto mb-12'>
                <UserAnalytics />
            </div>
            <div className='w-11/12 mx-auto my-8 '>
                <h1 className="mx-auto my-6 text-4xl">您需要採取動作的議題</h1>
                <div className='w-full flex justify-between gap-8'>
                    <PendingBoards />
                    <PendingBoards />
                    <PendingBoards />
                </div>
            </div>
        </div>
    )
}

export default HomePanel
