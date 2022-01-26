import { SearchIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchUI = () => {
    const navigate = useNavigate()
    const [searchText, setSearchText] = useState('')

    const tags = ['娛樂', '環境', '司法', '國家發展', '經濟', '少數族群', '媒體', '醫藥', '道德', '政治', '教育', '家庭', '女性', '自由', '宗教', '科技', '社會政策', '社會運動', '體育']

    const formSubmit = (e) => {
        e.preventDefault()

        if (searchText !== '') {
            if (searchText.charAt(0) === "#") navigate(`/search?tags=${searchText.substring(1)}`)
            else navigate(`/search?keyword=${searchText}`)
        }
    }

    return (
        <div className=" max-w-3xl mx-auto md:mt-[20vh] px-3 py-5 bg-gray-50">
            <form className="h-8 lg:h-14 flex items-center" onSubmit={formSubmit}>
                <input className="h-full mr-4 px-4 text-sm lg:text-xl flex-grow border-[0.5px] lg:rounded-3xl border-gray-700 rounded-lg"
                    placeholder="搜尋議題名字或是#標籤"
                    value={searchText}
                    onChange={(e) => { setSearchText(e.target.value) }}
                />
                <button className="w-7 h-7" type='submit'>
                    <SearchIcon className="w-full h-full" />
                </button>
            </form>
            <div className="w-11/12 mx-auto my-3">
                <h2 className="text-xl lg:text-3xl my-3 lg:my-4">熱門標籤</h2>
                <div className="flex flex-wrap gap-x-4 gap-y-3">
                    {tags.map((tag, i) =>
                        <button key={i} className="px-4 py-2 bg-gray-300 rounded-3xl" onClick={() => { navigate(`/search?tags=${tag}`) }} >
                            <p className="my-auto text-sm lg:text-lg">{tag}</p>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchUI;
