import React, { useState } from 'react'

const ReportContent = ({ rHeader, rQuestions, closeReportContent, boardId, motherComment, commentid }) => {
    const [cardHeader, setCardHeader] = useState(rHeader)
    const [selection, setSelection] = useState(null)
    const [submited, setSubmited] = useState(false)

    const reportSubmit = (e) => {
        e.preventDefault()
        if (!submited) ReportComment()
        else closeReportContent();
    }

    const ReportComment = () => {
        let reporturl = `${process.env.REACT_APP_BACKEND_URL}/api/report/comment/${boardId}${(motherComment !== null) ? "/" + motherComment : ""}/${commentid}`
        fetch(reporturl, {
            method: 'POST',
            headers: {
                'Authorization': localStorage.getItem("AuthToken"),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status === 200) {
                setSubmited(true)
                setCardHeader("我們已收到您的回覆")
            } else {
                setSubmited(true)
                setCardHeader("發生問題，請再試一次")
            }
        })
    }

    return (
        <div className="w-screen h-screen fixed top-0 left-0 grid align-middle z-30">
            <span className="w-screen h-screen absolute top-0 left-0 bg-black bg-opacity-50" onClick={() => { closeReportContent() }} />
            <div className="w-4/12 m-auto bg-white rounded-xl flex flex-col flex-auto z-10">
                <div className="mx-6 my-5">
                    <h1 className="text-black text-3xl">{cardHeader}</h1>
                    <form className="mx-2" onSubmit={reportSubmit}>
                        <ul className="list-none pt-4 ">
                            {!submited &&
                                rQuestions.map((violation, i) => {
                                    return (
                                        <li key={i} className="py-1">
                                            <input className="inline" type="radio" name="report-type" id={`report-${i}`} required onClick={() => { setSelection(i) }} />
                                            <label className="inline text-xl pl-2" htmlFor={`report-${i}`} >{violation}</label>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        <input className="w-20 h-12 bg-gray-300 mt-4 rounded-xl text-lg" type="submit" value={submited ? "關閉" : "提交"}></input>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ReportContent
