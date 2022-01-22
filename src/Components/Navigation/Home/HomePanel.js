import { useState, useEffect } from 'react';
import { sample } from 'lodash';
import Navtrack from '../Common/Navtrack';
import Navshelf from '../Common/Navshelf';

const HomePanel = () => {

    const [titleText, setTitleText] = useState('')
    const [tracks, setTracks] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/home/`, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem("AuthToken"),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                if (response.status === 200) return response.json()
                else if (response.status === 401) {
                    localStorage.removeItem("AuthToken")
                    window.location.href = "/login"
                }
            })
            .then(response => {
                let greetings = ['早安', '午安', '晚安']
                let midnightGreetings = ['很晚了，記得早點睡喔～', '看來你也是個夜貓子呢:D']
                let morningGreetings = ['早上的咖啡好喝嗎？', '今天天氣如何呢？']
                let noonGreetings = ['午餐好吃嗎？', '又見面了!']
                let nightGreetings = ['今天有加班嗎？', '很高興再看到你', '歡迎回來Speakup']

                let d = new Date()
                let timegreeting
                if (d.getHours() <= 4) timegreeting = `晚安，${sample(midnightGreetings)}`
                else if (d.getHours() <= 11) timegreeting = `早安，${sample(morningGreetings)}`
                else if (d.getHours() <= 17) timegreeting = `午安，${sample(noonGreetings)}`
                else if (d.getHours() <= 23) timegreeting = `晚安，${sample(nightGreetings)}`

                setTitleText(`${response.username}${timegreeting}`)
                setTracks(response.tracks)
                setIsLoading(false)
            })
            .catch(error => {
            })
    }, [])


    return (
        <div className='w-full pb-16'>
            <h1 className="w-11/12 mx-auto mt-10 mb-4 text-4xl">{titleText}</h1>
            <div className='md:hidden divide-y divide-gray-400'>
                {tracks.map((track, i) =>
                    <Navshelf key={i} title={track.title} cardsUrl={track.endpoint} />
                )}
            </div>
            <div className='hidden md:block divide-y divide-gray-400'>
                {tracks.map((track, i) =>
                    <Navtrack key={i} title={track.title} cardsUrl={track.endpoint} />
                )}
            </div>
        </div>
    );
};

export default HomePanel;
