import React, { useState, useEffect, Fragment } from 'react'
import { useParams } from 'react-router-dom'
import '../Styles/discussion.css'
import Header from '../Common/Header'
import Sidebar from '../Common/Sidebar'
import CommentField from './CommentField'
import DiscussionHeader from './DiscussionHeader'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'

const MainBoard = () => {
    var { boardId } = useParams()
    const [showSidebar, setShowSidebar] = useState(true)
    const [enableAnim, setEnableAnim] = useState(false)
    const [flowDisplay, setFlowDisplay] = useState(false);
    const [flowDisplatOpt, setFlowDisplayOpt] = useState("留言顯示方式")

    const toggleSidebar = () => {
        setEnableAnim(true)
        setShowSidebar(!showSidebar)
    }

    useEffect(() => {
        setTimeout(() => { setEnableAnim(false) }, 1200)
    }, [showSidebar])

    const DropdownSelector = () => {

        function classNames(...classes) {
            return classes.filter(Boolean).join(' ')
        }


        return (
            <Menu as="div" className="relative inline-block text-left z-10">
                <div>
                    <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                        {flowDisplatOpt}
                        <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                    </Menu.Button>
                </div>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <a className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm'
                                    )} onClick={() => { setFlowDisplay(false); setFlowDisplayOpt("區分立場") }}>
                                        區分立場
                                    </a>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <a className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm'
                                    )} onClick={() => { setFlowDisplay(true); setFlowDisplayOpt("不區分立場") }}>
                                        不區分立場
                                    </a>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        )

    }

    return (
        <div className="w-screen h-screen overflow-x-hidden overflow-y-auto bg-gray-50" onScroll={() => { document.getElementById("scrollTrigger").click() }}>
            <Header />
            {boardId != null &&
                <div>
                    <Sidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
                    <div className={`w-full pt-24 ${enableAnim ? "transition-padding" : "transition-none"} duration-1000 ease-out ${showSidebar ? "pl-72" : "pl-0"}`}>
                        <DiscussionHeader boardid={boardId} />
                    </div>
                    <div className="w-11/12 mx-auto my-6 flex justify-end">
                        <DropdownSelector />
                    </div>
                    <div className={`w-full ${enableAnim ? "transition-padding" : "transition-none"} duration-1000 ease-out ${showSidebar ? "pl-72" : "pl-0"}`}>
                        {flowDisplay ? <CommentField onSide={null} /> :
                            <div className="grid grid-cols-2 gap-12 w-11/12 mx-auto">
                                <CommentField onSide="支持方" />
                                <CommentField onSide="反對方" />
                            </div>
                        }
                    </div>
                </div>
            }
            <span id="scrollTrigger" />
        </div>
    )
}

export default MainBoard
