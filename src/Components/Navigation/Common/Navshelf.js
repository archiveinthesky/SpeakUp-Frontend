import { useState, useEffect } from 'react'
import { ArrowSmRightIcon } from '@heroicons/react/solid'
import WideNavCard from './WideNavCard'

const Navshelf = ({ title, cardsUrl }) => {
    const [cardsList, setCardsList] = useState([])

    useEffect(() => {

        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/tracks/${cardsUrl}`, {
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
        <div className="w-11/12 mx-auto py-6" >
            <div className='flex items-center'>
                <h1 className="text-3xl ml-2 whitespace-nowrap">{title}</h1>
                <button className='ml-4 text-blue-500 flex items-center'>
                    <p className='inline text-xl'>查看更多</p>
                    <ArrowSmRightIcon className='inline w-6 h-6' />
                </button>
            </div>
            <div className="mt-4 flex flex-col divide-y-8 divide-slate-200">
                {cardsList.map((card, i) => <WideNavCard key={i} carddata={card} />)}
            </div>
        </div >
    )
}

export default Navshelf
