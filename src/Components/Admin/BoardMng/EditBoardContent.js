import { useState, useEffect, useRef } from "react"
import { PlusCircleIcon, CheckCircleIcon, XCircleIcon, XIcon } from "@heroicons/react/outline"

const EditBoardContent = ({ initialData, submitFunction }) => {
    const [boardTitle, setBoardTitle] = useState("")
    const [tags, setTags] = useState([])
    const [typingTag, setTypingTag] = useState(false)
    const [newTagName, setNewTagName] = useState("")

    const [refdatas, setRefDatas] = useState([""])

    const [errors, setErrors] = useState({})

    const contentRef = useRef(null)
    const supArgRef = useRef(null)
    const agnArgRef = useRef(null)

    useEffect(() => {
        setBoardTitle(initialData.title)
        setTags(initialData.tags)
        contentRef.current.innerText = initialData.content
        supArgRef.current.innerText = initialData.supArg
        agnArgRef.current.innerText = initialData.agnArg
        setRefDatas(initialData.refData)
    }, [initialData])

    const newTag = () => {
        setTags([...tags, newTagName])
        setNewTagName("")
        setTypingTag(false)
    }

    const delTag = (tagid) => {
        let newTags = [...tags]
        newTags.splice(tagid, 1)
        setTags(newTags)
    }

    const newRefData = () => {
        setRefDatas([...refdatas, ""])
    }

    const delRefData = (dataid) => {
        let refDat = [...refdatas]
        refDat.splice(dataid, 1)
        setRefDatas(refDat)
    }

    const submitContent = () => {
        let errormessage = {}
        if (boardTitle.length < 5) errormessage.title = "標題需要多於五個字"
        else if (boardTitle.length > 20) errormessage.title = "標題不得超過20個字"

        if (tags.length === 0) errormessage.tags = "至少需要一個標籤"

        if (contentRef.current.innerText.length < 50) errormessage.content = "內容至少需要多於五十個字"
        if (supArgRef.current.innerText.length < 50) errormessage.supArg = "支持者立場分析至少需要多於五十個字"
        if (agnArgRef.current.innerText.length < 50) errormessage.agnArg = "反對者立場分析至少需要多於五十個字"

        refdatas.every(element => {
            try {
                new URL(element)
            } catch (_) {
                errormessage.refdata = "延伸資料需要是完整的網址"
                return false
            }
            return true
        })

        setErrors(errormessage)

        if (Object.keys(errormessage).length === 0) {
            const submitPayload = {
                title: boardTitle,
                tags: tags,
                content: contentRef.current.innerText,
                supArg: supArgRef.current.innerText,
                agnArg: agnArgRef.current.innerText,
                refData: refdatas
            }
            submitFunction(submitPayload)
        }
    }

    const submitOriginalContent = () => {
        submitFunction(initialData)
    }

    return (
        <div className="w-full px-10 py-10 bg-white rounded-xl">
            <div className="flex flex-col gap-8">
                <div className="flex items-center gap-8">
                    <h4 className="w-16 text-xl">標題</h4>
                    <div>
                        <input className="w-[650px] h-10 px-3 text-xl bg-white border-b-2 border-gray-400 focus:outline-0 "
                            value={boardTitle}
                            onChange={(e) => { setBoardTitle(e.target.value) }}
                        />
                        {errors.title !== undefined && <p className="my-1 text-md text-red-500">{errors.title}</p>}
                    </div>
                </div>
                <div className="flex items-center gap-8">
                    <h4 className="w-16 text-xl">標籤</h4>
                    <div>
                        <div className="flex gap-4">
                            {tags.map((tag, i) => (
                                <div key={i} className="h-8 px-4 pl-4 pr-2 rounded-2xl bg-blue-300 bg-opacity-50 flex items-center gap-1">
                                    <p className="text-center text-base text-blue-500 font-semibold">{`#${tag}`}</p>
                                    <button onClick={() => { delTag(i) }}>
                                        <XIcon className="w-4 h-4 text-blue-500" />
                                    </button>
                                </div>
                            ))}
                            {typingTag ?
                                <form className="flex gap-4" onSubmit={(e) => { e.preventDefault(); newTag() }}>
                                    <input className="w-32 h-8 px-4 py-auto rounded-2xl bg-blue-300 text-blue-500 font-bold bg-opacity-50"
                                        onChange={(e) => { setNewTagName(e.target.value) }}
                                        value={newTagName}
                                    />
                                    <div className="flex gap-2">
                                        <button type="submit">
                                            <CheckCircleIcon className="w-8 h-8 text-blue-500" />
                                        </button>
                                        <button onClick={() => { setTypingTag(false) }}>
                                            <XCircleIcon className="w-8 h-8 text-blue-500" />
                                        </button>
                                    </div>
                                </form> :
                                <button onClick={() => { setTypingTag(true); setNewTagName("") }}>
                                    <PlusCircleIcon className="w-8 h-8 text-blue-500" />
                                </button>
                            }
                        </div>
                        {errors.tags !== undefined && <p className="my-1 text-md text-red-500">{errors.tags}</p>}
                    </div>
                </div>
                <div className="flex items-center gap-8">
                    <h4 className="w-16 flex-shrink-0 text-xl">內容</h4>
                    <div className="w-full">
                        <div
                            className="flex-grow px-3 py-1 text-xl bg-white border-b-2 border-gray-400 resize-none focus:outline-0"
                            contentEditable={true}
                            ref={contentRef}
                            onKeyPress={e => { if (e.key === 'Enter') e.preventDefault() }}
                        />
                        {errors.content !== undefined && <p className="my-1 text-md text-red-500">{errors.content}</p>}
                    </div>
                </div>
                <div className="flex items-center gap-8">
                    <h4 className="w-16 flex-shrink-0 text-xl">支持方<br />的立場</h4>
                    <div className="w-full">
                        <div
                            className="flex-grow px-3 py-1 text-xl bg-white border-b-2 border-gray-400 resize-none focus:outline-0"
                            contentEditable={true}
                            ref={supArgRef}
                            onKeyPress={e => { if (e.key === 'Enter') e.preventDefault() }}
                        />
                        {errors.supArg !== undefined && <p className="my-1 text-md text-red-500">{errors.supArg}</p>}
                    </div>
                </div>
                <div className="flex items-center gap-8">
                    <h4 className="w-16 flex-shrink-0 text-xl">反對方<br />的立場</h4>
                    <div className="w-full">
                        <div
                            className="flex-grow px-3 py-1 text-xl bg-white border-b-2 border-gray-400 resize-none focus:outline-0"
                            contentEditable={true}
                            ref={agnArgRef}
                            onKeyPress={e => { if (e.key === 'Enter') e.preventDefault() }}
                        />
                        {errors.agnArg !== undefined && <p className="my-1 text-md text-red-500">{errors.agnArg}</p>}
                    </div>
                </div>
                <div className="flex items-center gap-8">
                    <h4 className="w-16 text-xl">延伸<br />資料</h4>
                    <div>
                        <div className="w-[700px] flex flex-col gap-2">
                            {refdatas.map((reflink, i) =>
                                <div className="w-full flex items-end gap-3" key={i}>
                                    <input
                                        className="w-full h-8 px-2 text-lg leading-4 bg-white border-b-2 border-gray-400 focus:outline-0"
                                        value={reflink}
                                        onChange={(e) => {
                                            let refdat = [...refdatas]
                                            refdat[i] = e.target.value
                                            setRefDatas(refdat)
                                        }}
                                    />
                                    <button className="text-blue-500 disabled:text-blue-400"
                                        disabled={refdatas.length === 1}
                                        onClick={() => { delRefData(i) }}
                                    >
                                        <XCircleIcon className="w-7 h-7" />
                                    </button>
                                </div>
                            )}
                            <button onClick={newRefData} className="text-blue-500 disabled:text-blue-400" disabled={refdatas[refdatas.length - 1] === ""}>
                                <PlusCircleIcon className="w-7 h-7" />
                            </button>
                        </div>
                        {errors.refdata !== undefined && <p className="my-1 text-md text-red-500">{errors.refdata}</p>}
                    </div>
                </div>
                <div className="flex gap-4">
                    <button className="px-5 py-2 bg-blue-500 text-white text-lg rounded-lg" onClick={submitContent}>儲存</button>
                    <button className="px-5 py-2 bg-gray-300 text-gray-700 text-lg rounded-lg" onClick={submitOriginalContent}>取消</button>
                </div>
            </div>
        </div>
    )
}

export default EditBoardContent
