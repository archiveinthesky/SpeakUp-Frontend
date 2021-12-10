import React, { useState, useEffect } from 'react'
import Navcard from './Navcard'

const Navtrack = ({ title, cardsUrl }) => {
    const [cardsList, setCardsList] = useState("'title':'網路自由','tags':'自由;l2媒體','content':'在社群網站、論壇等網路平台上，使用者留言或發文時往往不需要顯示真實身分...','link':'../discussions/1','saved':'true';l1'title':'心跳法案','tags':'女性;l2道德;l2自由;l2醫藥','content':'2021/05/19德州心跳法案通過，只要超過懷孕超過六周而墮胎，任何人皆可在州立法院對協助...','link':'../discussions/2','saved':'false'".replaceAll("'", '"'))

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
                if (response.cards != null) {
                    setCardsList(response.cards.replaceAll("'", '"'))
                }
            })
    }, [cardsUrl])

    return (
        <div className="w-11/12 mx-auto">
            <h1 className="text-3xl ml-2">{title}</h1>
            <div className="mt-4 overflow-x-auto flex gap-6">
                {cardsList.split(";l1").map((card, i) => {
                    var data = JSON.parse(`{${card}}`)
                    return (
                        < Navcard key={i} carddata={data} />
                    )
                })}
            </div>
            <div className="w-full my-4 border-t-2 border-gray-300"></div>
        </div>
    )
}

export default Navtrack
