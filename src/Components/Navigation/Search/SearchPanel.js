import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

import WideNavCard from '../Common/WideNavCard';

const SearchPanel = () => {
    const [titleText, setTitleText] = useState('')
    const [searchParams, setSearchParams] = useState({})
    const [searchRes, setSearchRes] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [onResult, setOnResult] = useState(0)
    const [hasMoreResults, setHasMoreResults] = useState(true)

    const { ref: lastCardRef, inView: lastCardInView, entry } = useInView()
    const firstLoad = useRef(true)

    const navigate = useNavigate()
    const location = useLocation()

    const getSearchRes = (start, end) => {
        if (searchParams.keyword !== null || searchParams.tags !== null) {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/api/search/`, {
                method: 'POST',
                headers: {
                    'Authorization': localStorage.getItem("AuthToken"),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Start-Pos': start,
                    'End-Pos': end
                },
                body: JSON.stringify(searchParams)
            })
                .then(response => { return response.json() })
                .then(response => {
                    if (response.length === 0) setTitleText("很抱歉，找不到符合您搜尋條件的結果")
                    setSearchRes([...searchRes, ...response.map((board) => {
                        if (board.lastResult === true) setHasMoreResults(false)
                        return {
                            "title": board.title,
                            "tags": board.tags,
                            "content": board.brief,
                            "boardId": board.boardId,
                            "saved": board.saved
                        }
                    })])
                    setOnResult(end)
                    setIsLoading(false)
                })
                .catch(error => { })
        } else {
            navigate('/searcherror')
        }
    }

    useEffect(() => {
        let currentSearchParam = new URLSearchParams(location.search)
        let keyword = currentSearchParam.has("keyword") ? currentSearchParam.get("keyword") : null
        let tags = currentSearchParam.has("tags") ? currentSearchParam.get("tags") : null
        let searchData = {}
        if (keyword !== null) searchData['keyword'] = keyword
        if (tags !== null) searchData['tags'] = tags
        setSearchParams(searchData)
    }, [])

    useEffect(() => {
        if (!firstLoad.current) {
            getSearchRes(onResult + 1, onResult + 10)
        }
        else firstLoad.current = false
    }, [searchParams])

    useEffect(() => {
        if (entry !== undefined) {
            if (entry.isIntersecting && hasMoreResults && !isLoading) {
                getSearchRes(onResult + 1, onResult + 10)
                setHasMoreResults(false)
            }
        }
    }, [lastCardInView])


    return (
        <div className='w-full pt-10 pb-24 lg:pb-16'>
            <div className='w-5/6 mx-auto'>
                <h1 className={`w-full text-4xl my-6`}>
                    {searchRes.length === 0 ? '很抱歉，找不到符合您搜尋條件的結果' :
                        <>以下是
                            <span className={`${searchParams.tags !== undefined ? 'text-blue-500' : ''}`}>
                                {searchParams.tags !== undefined ? `#${searchParams.tags}` : searchParams.keyword}
                            </span>
                            的搜尋結果
                        </>
                    }
                </h1>
                <div className="w-full mt-4 mx-auto flex flex-col gap-4">
                    {searchRes.map((card, i) =>
                        <WideNavCard key={i} carddata={card} ref={i === searchRes.length - 1 ? lastCardRef : null} />
                    )}
                </div>
            </div>
        </div >
    );
};

export default SearchPanel;
