import React, { useEffect, useState } from 'react'
import LogoAqua from './Images/logo-aqua.svg'


const LoginTopic = ({ title = null, contents = null }) => {
    const [topicTitle, setTopicTitle] = useState(title !== null ? title : "")
    const [topicContents, setTopicContents] = useState(contents !== null ? contents : [])

    useEffect(() => {
        if (title === null || contents === null) {
            fetch("http://localhost:8000/api/boards/randomtopic/")
                .then(response => { return response.json() })
                .then((response) => {
                    setTopicTitle(response.title)
                    setTopicContents(response.content)
                })

        }
    }, [])

    useEffect(() => {
        if (title !== null && contents !== null) {
            setTopicTitle(title)
            setTopicContents(contents)
        }
    }, [title, contents])

    return (
        <div className='relative w-full h-4/6'>
            <img className='absolute -top-24 left-0 w-60' src={LogoAqua} alt="Speakup Logo"></img>
            <div className='w-11/12 h-[45vh] mt-24 px-10 py-9 overflow-y-auto overflow-scrollbar-hide bg-logo-aqua rounded-[40px]'>
                <h1 className='text-4xl text-white font-rounded'>{(topicTitle !== null) && topicTitle}</h1>
                <hr className='mt-4 w-full h-[1px] bg-white' />
                {topicContents !== null &&
                    topicContents.map((content, i) => {
                        return <p className='text-xl text-white my-4 font-rounded leading-8' key={i}>{content}</p>
                    })
                }
            </div>
        </div>
    )
}

export default LoginTopic
