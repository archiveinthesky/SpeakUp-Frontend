import { Outlet } from "react-router-dom";

import Header from "../Common/Header";
import Sidebar from "../Common/Sidebar";
import Footbar from "../Common/Footbar";

import HomePanel from "./Home/HomePanel";
import SearchPanel from './Search/SearchPanel'
import CollectionsPanel from './Collections/CollectionsPanel'

const NavPanel = ({ mode }) => {
    return (
        <div className="w-screen h-screen overflow-x-hidden bg-slate-200" >
            <Header />
            <div className='w-full h-full pt-16 flex'>
                <Sidebar />
                <Footbar />
                <div className="flex-grow overflow-y-auto scrollbar-hide">
                    {mode === "home" && <HomePanel />}
                    {mode === "search" && <SearchPanel />}
                    {mode === "collections" && <CollectionsPanel />}
                </div>
            </div>
        </div>

    );
};

export default NavPanel;
