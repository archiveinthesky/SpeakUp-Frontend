import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { BookmarkIcon } from '@heroicons/react/outline'

import SaveBoard from '../../Common/SaveBoards'

const Navcard = ({ carddata }) => {
    const [isSaved, setIsSaved] = useState(carddata.saved)

    const toggleSaved = () => {
        SaveBoard(carddata.boardId, !isSaved)
        setIsSaved(!isSaved)
    }

    console.log(carddata)

    return (
        <div className="min-w-[320px] w-full relative bg-white">
            <>
                <Link to={`../discussions/${carddata.boardid}`}>
                    <div className="pt-4 px-6" >
                        <h3 className=" text-black text-xl lg:text-2xl">{carddata.title}</h3>
                        {carddata.tags != null &&
                            <div className="flex my-1 justify-start gap-2">
                                {
                                    carddata.tags.split(",").map((tag, i) => {
                                        return <div key={i} className="h-5 px-2.5 rounded-2xl bg-blue-300 bg-opacity-50">
                                            <p className="leading-5 whitespace-nowrap text-center text-xs text-blue-500 font-bold">{`#${tag}`}</p>
                                        </div>
                                    })
                                }
                            </div>
                        }
                        <p className="w-full mt-2 mb-4 mx-auto text-base lg:text-lg text-gray-600 line-clamp-3 text-ellipsis ">{carddata.content}</p>
                    </div>
                </Link>

                <button className='absolute right-2 bottom-2' onClick={toggleSaved}>
                    <BookmarkIcon className={`w-8 h-8 ${isSaved ? 'fill-yellow-300' : 'fill-white'}`} />
                </button>

            </>
        </div >
    )
}

export default Navcard
