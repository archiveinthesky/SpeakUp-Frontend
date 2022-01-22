import { useEffect, useState, forwardRef } from 'react'
import { Link } from 'react-router-dom'

import { HomeIcon, TrendingUpIcon, BookmarkIcon } from '@heroicons/react/outline'

const Sidebar = () => {

    const tags = ['教育', '娛樂', '媒體', '科技'];
    //['娛樂', '環境', '司法', '國家發展', '經濟', '少數族群', '媒體', '醫藥', '道德', '政治', '教育', '家庭', '女性', '自由', '宗教', '科技', '社會政策', '社會運動', '體育'];

    return (<>
        <div className={`w-20 hover:w-72 hover:xl:w-80 h-full flex-shrink-0 group bg-white border-r-2 border-gray-200 flex flex-col transition-width duration-700 delay-100 overflow-x-hidden ease-out`}>
            <div className="h-6" />
            <div className='w-full'>
                <ul className="mx-auto w-8 group-hover:w-auto group-hover:pl-10">
                    <Link to="/home">
                        <li className="flex list-none py-3 gap-4">
                            <HomeIcon className='w-8 h-8 flex-shrink-0' />
                            <p className="hidden group-hover:block text-black text-2xl leading-8 whitespace-nowrap">首頁</p>
                        </li>
                    </Link>
                    <Link to="/search?tags=封測議題">
                        <li className="flex list-none py-3 gap-4">
                            <TrendingUpIcon className='w-8 h-8 flex-shrink-0' />
                            <p className="hidden group-hover:block text-black text-2xl leading-8 whitespace-nowrap">封測議題</p>
                        </li>
                    </Link>
                    <Link to="/collections">
                        <li className="flex list-none py-3 gap-4">
                            <BookmarkIcon className='w-8 h-8 flex-shrink-0' />
                            <p className="hidden group-hover:block text-black text-2xl leading-8 whitespace-nowrap">我的收藏</p>
                        </li>
                    </Link>
                </ul>
            </div>
            <div className='hidden group-hover:block'>
                <div className="py-3">
                    <hr className="border-t-2 border-gray-300 w-5/6 mx-auto" />
                </div>
                <ul className="list-none h-3/5 pl-14 md:pl-20 xl:pl-24 overflow-auto">
                    {tags.map((tag, i) => {
                        return (
                            <Link to={`/search?tags=${tag}`} key={`link${i}`}>
                                <li key={i} className="py-2 text-xl whitespace-nowrap">{tag}</li>
                            </Link>
                        )
                    })}
                </ul>
            </div>

        </div>
    </>
    )
}

export default Sidebar
