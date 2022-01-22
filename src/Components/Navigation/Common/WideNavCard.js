import { useState, forwardRef } from 'react'
import { Link } from 'react-router-dom'

import { BookmarkIcon } from '@heroicons/react/outline'

import SaveBoard from '../../Common/SaveBoards'

const WideNavCard = forwardRef(({ carddata }, ref) => {

    const [isSaved, setIsSaved] = useState(carddata.saved)

    const toggleSaved = () => {
        setIsSaved(!isSaved)
        SaveBoard(carddata.boardId, !isSaved)
    }

    return (
        <div className="w-full relative flex-shrink-0 bg-white" ref={ref} >
            <Link to={`../discussions/${carddata.boardId}`}>
                <div className="p-4 px-6" >
                    <h3 className=" text-black text-3xl">{carddata.title}</h3>
                    {carddata.tags != null &&
                        <div className="flex my-2 justify-start gap-2">
                            {
                                carddata.tags.split(",").map((tag, i) => {
                                    return <div key={i} className="px-2 h-5 rounded-2xl bg-blue-300 bg-opacity-50">
                                        <p className="leading-5 text-center text-xs text-blue-500 font-bold">{`#${tag}`}</p>
                                    </div>
                                })
                            }
                        </div>
                    }
                    <p className="w-full my-2 mx-auto text-lg text-gray-600 line-clamp-3 text-ellipsis">{carddata.content}</p>
                </div>
            </Link>

            <button className="absolute right-4 bottom-4" onClick={toggleSaved}>
                <BookmarkIcon className={`w-8 h-8 ${isSaved ? 'fill-yellow-300' : 'fill-white'}`} />
            </button>
        </div >
    )
})

export default WideNavCard
