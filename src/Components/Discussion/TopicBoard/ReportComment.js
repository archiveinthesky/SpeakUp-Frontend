import React from 'react'

const ReportComment = ({ closeReportComment }) => {
    const reportSubmit = (e) => {
        e.preventDefault()
        console.log("su")
        closeReportComment();
    }

    return (
        <div className="w-screen h-screen fixed top-0 left-0 grid align-middle z-10">
            <span className="w-screen h-screen absolute top-0 left-0 bg-black bg-opacity-50" onClick={() => { closeReportComment() }} />
            <div className="w-4/12 m-auto bg-white rounded-3xl flex flex-col flex-auto z-10">
                <div className="mx-6 my-5">
                    <h1 className="text-black text-3xl">您認為此留言有什麼問題？</h1>
                    <form className="mx-2" onSubmit={reportSubmit}>
                        <ul className="list-none pt-4 ">
                            <li className="py-1">
                                <input className="inline" type="radio" name="report-type" />
                                <p className="inline text-xl pl-2">留言內容惡意攻擊其他使用者</p>
                            </li>
                            <li className="py-1">
                                <input className="inline" type="radio" name="report-type" />
                                <p className="inline text-xl pl-2">留言內容與此討論無關</p>
                            </li>
                            <li className="py-1">
                                <input className="inline" type="radio" name="report-type" />
                                <p className="inline text-xl pl-2">留言內容含有騷擾、廣告內容</p>
                            </li>
                            <li className="py-1">
                                <input className="inline" type="radio" name="report-type" onSelect={() => { console.log("asdf") }} />
                                <p className="inline text-xl pl-2">其他</p>
                            </li>
                        </ul>
                        <input className="w-20 h-12 mt-4 rounded-2xl text-lg" type="submit" value="提交"></input>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ReportComment
