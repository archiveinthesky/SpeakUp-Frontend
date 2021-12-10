import React, { useState, useEffect } from 'react'
import Navcard from './Navcard'

const Navtrack = ({ title, cardsUrl }) => {
    const [cardsList, setCardsList] = useState("")

    useEffect(() => {
        fetch(`http://127.0.0.1:5500/topictracks/${cardsUrl}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(response => { return response.json() })
            .then(response => {
                setCardsList(response.cards.replaceAll("'", '"'))
            })
        // setCardsList('"title":"網路自由","tags":"自由;l2媒體","content":"我喜歡123","link":"ghi";l1"title":"abc","tags":"自由;l2媒體","content":"def","link":"ghi"')
    }, [])

    return (
        <div className="w-11/12 mx-auto">
            <h1 className="text-3xl ml-2">{title}</h1>
            <div className="mt-4 overflow-x-auto flex gap-6">
                {cardsList.split(";l1").map((card, i) => {
                    return (
                        <Navcard key={i} carddata={JSON.parse(`{${card}}`)} />
                    )
                })}
            </div>
            <div className="w-full my-4 border-t-2 border-gray-300"></div>
        </div>
    )
}

export default Navtrack
