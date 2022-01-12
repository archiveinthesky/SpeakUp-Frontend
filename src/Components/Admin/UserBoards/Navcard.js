import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'

import { EyeIcon, BookmarkIcon } from '@heroicons/react/outline'

const Navcard = ({ carddata }) => {
    const cardtitle = useRef(null)

    return (
        <div className="w-96 flex-shrink-0 bg-white rounded-xl">
            <Link to={`${carddata.boardId}`}>
                <div className="h-full pt-4 pb-6 px-6" >
                    <h3 className="text-black text-2xl" ref={cardtitle}>{carddata.title}</h3>
                    <div className="flex my-2 justify-start gap-2">
                        <div className="flex items-center gap-1">
                            <EyeIcon className="inline w-6 h-6" />
                            <p className="inline">{carddata.views}</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <BookmarkIcon className="inline w-6 h-6" />
                            <p className="inline">{carddata.collections}</p>
                        </div>
                    </div>
                    <p className="w-80 max-h-36 mt-2 mx-1 text-lg leading-6 text-gray-600 overflow-y-hidden">{carddata.content}</p>
                </div>
            </Link>
        </div >
    )
}

export default Navcard
