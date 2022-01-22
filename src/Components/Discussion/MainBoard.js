import React, { useState, useEffect, Fragment } from 'react'
import { useParams } from 'react-router-dom'
import './Styles/discussion.css'
import Header from '../Common/Header'
import Sidebar from '../Common/Sidebar'
import CommentField from './CommentField'
import DiscussionHeader from './DiscussionHeader'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'

const MainBoard = () => {
    const { boardId } = useParams()
    const [flowDisplay, setFlowDisplay] = useState(1);
    const [screenSize, setScreenSize] = useState("sm")

    const updateScreen = () => {
        let newScreenSize
        if (window.innerWidth < 1024) newScreenSize = "sm"
        else if (window.innerWidth >= 1024 && window.innerWidth <= 1280) newScreenSize = "lg"
        else newScreenSize = "xl"

        setScreenSize(newScreenSize)

        if (flowDisplay === 0 && newScreenSize === "sm") setFlowDisplay(1)
        else if ((flowDisplay === 1 || flowDisplay === 2) && newScreenSize !== "sm") setFlowDisplay(0)
    }

    useEffect(() => {
        updateScreen()
        window.onresize = updateScreen
    }, [flowDisplay])

    const DropdownSelector = () => {

        function menuText() {
            var ret
            if (flowDisplay === 0) ret = "區分立場"
            else if (flowDisplay === 1) ret = "支持方"
            else if (flowDisplay === 2) ret = "反對方"
            else if (flowDisplay === 3) ret = "不區分立場"
            else throw new Error('Flow Display Bad Config')
            return ret
        }

        return (
            <Menu as="div" className="relative inline-block text-left z-10">
                <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                    {menuText()}
                    <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                </Menu.Button>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            {screenSize === "sm" ?
                                <>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} w-full text-left px-4 py-2 text-sm`}
                                                onClick={() => { setFlowDisplay(false); setFlowDisplay(1) }}>支持方</button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} w-full text-left px-4 py-2 text-sm`}
                                                onClick={() => { setFlowDisplay(false); setFlowDisplay(2) }}>反對方</button>
                                        )}
                                    </Menu.Item>
                                </> :
                                <Menu.Item>
                                    {({ active }) => (
                                        <button className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} w-full text-left px-4 py-2 text-sm`}
                                            onClick={() => { setFlowDisplay(false); setFlowDisplay(0) }}>區分立場</button>
                                    )}
                                </Menu.Item>
                            }
                            <Menu.Item>
                                {({ active }) => (
                                    <button className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} w-full text-left px-4 py-2 text-sm`}
                                        onClick={() => { setFlowDisplay(true); setFlowDisplay(3) }}>不區分立場</button>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        )

    }

    return (
        <div className="w-screen h-screen overflow-x-hidden bg-gray-50" >
            <Header />
            <div className='w-full h-full pt-16 flex'>
                <Sidebar />

                {boardId != null &&
                    <div className='overflow-y-auto scrollbar-hide'>
                        <div className={`w-full mt-10 `}>
                            <DiscussionHeader boardId={boardId} />
                        </div>
                        <div className="w-11/12 mx-auto my-6 flex justify-end">
                            <DropdownSelector />
                        </div>
                        <div className={`w-full`}>
                            {flowDisplay === 3 ? <CommentField boardId={boardId} onSide={null} /> :
                                <>{flowDisplay === 0 ?
                                    <div className="grid grid-cols-2 gap-12 w-11/12 mx-auto">
                                        <CommentField boardId={boardId} onSide="支持方" />
                                        <CommentField boardId={boardId} onSide="反對方" />
                                    </div> :
                                    <CommentField boardId={boardId} onSide={flowDisplay === 3 ? null : (flowDisplay === 1 ? "支持方" : "反對方")} />
                                }</>
                            }
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default MainBoard
