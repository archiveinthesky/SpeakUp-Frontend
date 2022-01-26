import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Header from "../Common/Header";
import Sidebar from "../Common/Sidebar";
import Footbar from "../Common/Footbar";

import HomePanel from "./Home/HomePanel";
import SearchUI from './Search/SearchUI'
import SearchPanel from './Search/SearchPanel'
import CollectionsPanel from './Collections/CollectionsPanel'

const NavPanel = ({ mode }) => {
    const { search: searchParam } = useLocation()

    return (
        <div className="w-screen h-screen overflow-x-hidden bg-slate-200" >
            <Header />
            <div className='w-full h-full pt-16 flex'>
                <Sidebar />
                <Footbar />
                <div className="flex-grow overflow-y-auto scrollbar-hide">
                    {mode === "home" && <HomePanel />}
                    {mode === "search" && <>
                        {searchParam === '' ? <SearchUI /> : <SearchPanel />}
                    </>}
                    {mode === "collections" && <CollectionsPanel />}
                </div>
            </div>
        </div>

    );
};

export default NavPanel;
