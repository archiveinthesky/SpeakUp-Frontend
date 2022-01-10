import React, { useState, useEffect } from 'react'
import Navcard from './Navcard'

const Navtrack = ({ title, cardsUrl }) => {
    const [cardsList, setCardsList] = useState([])

    useEffect(() => {
        setCardsList([{
            boardid: 1,
            title: "台灣應該廢除早自習嗎",
            tags: 'yo,hi',
            views: 1234,
            collections: 567,
            content: 'Eu officia in duis ex consectetur velit officia dolor velit ullamco dolore deserunt. Anim commodo Lorem enim enim ipsum cupidatat quis amet cillum deserunt officia veniam aliqua. Aute nulla duis dolor enim veniam dolor velit minim consectetur et laborum do. Aliqua aute exercitation enim aliqua consequat aute veniam excepteur ullamco nisi nisi occaecat. Esse reprehenderit fugiat quis tempor irure deserunt consequat anim nostrud aute occaecat duis amet aute. Sunt duis ullamco tempor cupidatat velit laborum enim. In non minim consequat quis nulla incididunt commodo nulla aute.'
        }, {
            boardid: 1,
            title: "台灣應該廢除早自習嗎",
            tags: 'yo,hi',
            views: 1234,
            collections: 567,
            content: 'Eu officia in duis ex consectetur velit officia dolor velit ullamco dolore deserunt.'
        }])
    }, [])

    return (
        <div className="w-11/12 mx-auto" >
            <h1 className="text-3xl">{title}</h1>
            <div className="mt-4 overflow-x-auto overflow-y-hidden flex gap-6">
                {cardsList.map((card, i) => <Navcard key={i} carddata={card} />)}
            </div>
            <div className="w-full my-4 border-t-2 border-gray-300"></div>
        </div >
    )
}

export default Navtrack
