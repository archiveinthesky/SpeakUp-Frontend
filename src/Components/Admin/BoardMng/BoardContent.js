import { useState } from "react"
import { useEffect } from "react/cjs/react.development"
import EditBoardContent from "./EditBoardContent"
import PreviewBoardContent from "./PreviewBoardContent"

const BoardContent = () => {
    const [boardContent, setBoardContent] = useState({})
    const [inEdit, setInEdit] = useState(false)

    useEffect(() => {
        console.log("hello")
        setBoardContent({
            title: "台灣應該廢除早自習嗎",
            tags: ['教育'],
            content: 'Officia eu ad anim elit id. Do magna anim amet laboris anim in irure ipsum nisi dolor. Adipisicing excepteur excepteur ea cupidatat fugiat nostrud eu eu do. Ut deserunt proident sit exercitation cupidatat deserunt excepteur Lorem sint anim voluptate pariatur ex fugiat. Ea nulla nisi tempor esse exercitation.',
            supArg: 'Exercitation elit officia pariatur adipisicing voluptate eu eu cillum. Sint cupidatat adipisicing cillum est reprehenderit aute occaecat aliqua ullamco adipisicing reprehenderit aute amet. Elit esse voluptate nisi esse ut eu magna ea ut fugiat magna.',
            agnArg: 'Eu nisi commodo anim velit aliquip dolore commodo qui. Ex amet magna Lorem amet adipisicing aliquip. Ullamco voluptate amet mollit ea labore sint. Ipsum voluptate dolore quis anim dolor officia. Veniam voluptate officia in duis proident aliquip. Duis voluptate commodo eu ex.',
            refData: ['https://www.google.com']
        })
    }, [])

    const updateBoardContent = (newboardcontent) => {
        console.log(newboardcontent)
        setBoardContent(newboardcontent)
        setInEdit(false)
    }

    return (
        <div className="w-full h-full">
            {inEdit ?
                <EditBoardContent initialData={boardContent} submitFunction={updateBoardContent} /> :
                <PreviewBoardContent boarddata={boardContent} editContent={() => { setInEdit(true) }} />
            }
        </div>
    )
}

export default BoardContent
