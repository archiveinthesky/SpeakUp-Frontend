import { useState } from 'react'
import checkIcon from '../../../Assets/Admin/CmtMod/checkIcon.svg'
import crossIcon from '../../../Assets/Admin/CmtMod/crossIcon.svg'

const TrialComment = ({ cmtPos, data, replingTo = null, toggleThread, sendDecision }) => {
    const [showThread, setShowThread] = useState(false)

    return (
        <div className="w-full flex justify-between items-center gap-8">
            <div className="w-5/6" onBlur={() => { console.log("nah") }}>
                <p className="text-base">{data.content}</p>
                {data.replingTo && <button
                    onClick={() => { toggleThread(!showThread, data.id); setShowThread(!showThread) }}
                    className='mt-1 text-blue-500'
                >
                    {showThread ? "收合對話串" : "展開對話串"}
                </button>}
            </div>
            <div className="w-1/6 flex justify-between gap-3">
                <button onClick={() => { sendDecision(true, cmtPos) }}>
                    <img className='w-10' src={checkIcon} alt="Accept"></img>
                </button>
                <button onClick={() => { sendDecision(true, cmtPos) }}>
                    <img className='w-10' src={crossIcon} alt="Decline"></img>
                </button>
            </div>
        </div >
    )
}

export default TrialComment
