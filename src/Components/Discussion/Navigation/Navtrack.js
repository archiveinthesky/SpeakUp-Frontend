import React, { useState, useEffect } from 'react'
import Navcard from './Navcard'

const Navtrack = ({ title, cardsUrl }) => {
    const [cardsList, setCardsList] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8000/api/tracks/${cardsUrl}`, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem("AuthToken"),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(response => { return response.json() })
            .then(response => {
                setCardsList(response)
            })
    }, [cardsUrl])

    return (
        <div className="w-11/12 mx-auto" >
            <h1 className="text-3xl ml-2">{title}</h1>
            <div className="mt-4 overflow-x-auto flex gap-6">
                {cardsList.map((card, i) => {
                    return (
                        < Navcard key={i} carddata={card} />
                    )
                })}
            </div>
            <div className="w-full my-4 border-t-2 border-gray-300"></div>
        </div >
    )
}

export default Navtrack
