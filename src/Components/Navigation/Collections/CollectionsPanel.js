import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

import WideNavCard from '../Common/WideNavCard';

const CollectionsPanel = () => {
    const [titleText, setTitleText] = useState('')
    const [collections, setCollections] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [onResult, setOnResult] = useState(0)
    const [hasMoreResults, setHasMoreResults] = useState(true)

    const { ref: lastCardRef, inView: lastCardInView, entry } = useInView()
    const firstLoad = useRef(true)

    const getCollections = (start, end) => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/collection/`, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem("AuthToken"),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Start-Pos': start,
                'End-Pos': end
            },
        })
            .then(response => { return response.json() })
            .then(response => {
                console.log(response)
                setTitleText(response.length > 0 ? "您的收藏" : "您目前沒有收藏")
                setCollections([...collections, ...response.map((content) => {
                    if (content.lastItem) setHasMoreResults(false)
                    else return content
                })])
                setOnResult(end)
                setIsLoading(false)
            })
            .catch(error => { })
    }

    useEffect(() => {
        getCollections(onResult + 1, onResult + 10)
    }, [])

    useEffect(() => {
        if (entry !== undefined) {
            if (entry.isIntersecting && hasMoreResults && !isLoading) {
                getCollections(onResult + 1, onResult + 10)
                setHasMoreResults(false)
            }
        }
    }, [lastCardInView])


    return (
        <div className='w-full pt-10 pb-24 lg:pb-16'>
            <div className='w-11/12 mx-auto'>
                <h1 className={`w-full text-4xl my-6`}>{titleText}</h1>
                <div className="w-full mt-4 mx-auto flex flex-col gap-4">
                    {collections.map((card, i) =>
                        <WideNavCard key={i} carddata={card} ref={i === collections.length - 1 ? lastCardRef : null} />
                    )}
                </div>
            </div>
        </div >
    );
};

export default CollectionsPanel;
