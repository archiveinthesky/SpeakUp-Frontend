import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import SaveBoard from '../Common/SaveBoards'

const WideNavCard = ({ carddata }) => {

    const [isSaved, setIsSaved] = useState(carddata.saved)

    const toggleSaved = () => {
        setIsSaved(!isSaved)
        SaveBoard(carddata.boardid, !isSaved)
    }

    return (
        <div className="w-full h-48 relative flex-shrink-0 bg-white"  >
            <Link to={`../discussions/${carddata.boardid}`}>
                <div className="h-40 pt-4 px-6" >
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
                    <p className="w-full mt-2 mb-4 mx-auto text-lg text-gray-600">{carddata.content}</p>
                </div>
            </Link>

            <button className="absolute right-4 bottom-4" onClick={toggleSaved}>
                <svg className="w-7 h-7" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect className={`transition-all duration-200 ease-out ${isSaved ? "opacity-100" : "opacity-0"}`} x="1" y="1" width="14" height="15" fill="#FCD34D" />
                    <path className={`transition-all duration-200 ease-out ${isSaved ? "opacity-100" : "opacity-0"}`} d="M2 17.5V15L6 15.5L2 17.5Z" fill="#FCD34D" />
                    <path className={`transition-all duration-200 ease-out ${isSaved ? "opacity-100" : "opacity-0"}`} d="M14 18V15L10 15.6L14 18Z" fill="#FCD34D" />
                    <path d="M8 16.62L1.45 19.89C1.29777 19.9667 1.12846 20.0032 0.958143 19.9961C0.787827 19.989 0.622163 19.9384 0.476882 19.8492C0.331601 19.7601 0.211527 19.6352 0.128063 19.4866C0.0445991 19.338 0.000515869 19.1705 0 19V2C0 0.9 0.9 0 2 0H14C14.5304 0 15.0391 0.210714 15.4142 0.585786C15.7893 0.960859 16 1.46957 16 2V19C16.0012 19.1713 15.9584 19.3401 15.8756 19.4901C15.7928 19.6401 15.6729 19.7663 15.5274 19.8566C15.3818 19.947 15.2155 19.9984 15.0444 20.006C14.8732 20.0136 14.703 19.9771 14.55 19.9L8 16.61V16.62ZM14 2H2V17.38L7.55 14.61C7.68958 14.5397 7.8437 14.503 8 14.503C8.1563 14.503 8.31042 14.5397 8.45 14.61L14 17.38V2Z" fill="black" />
                </svg>
            </button>
        </div >
    )
}

export default WideNavCard
