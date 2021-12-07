import React, { useState } from 'react'

const ReportContent = ({ rHeader, rQuestions, closeReportContent }) => {
    const [selection, setSelection] = useState(null)

    const reportSubmit = (e) => {
        e.preventDefault()
        console.log(selection)
        closeReportContent();
    }

    return (
        <div className="w-screen h-screen fixed top-0 left-0 grid align-middle z-10">
            <span className="w-screen h-screen absolute top-0 left-0 bg-black bg-opacity-50" onClick={() => { closeReportContent() }} />
            <div className="w-4/12 m-auto bg-white rounded-3xl flex flex-col flex-auto z-10">
                <div className="mx-6 my-5">
                    <h1 className="text-black text-3xl">{rHeader}</h1>
                    <form className="mx-2" onSubmit={reportSubmit}>
                        <ul className="list-none pt-4 ">
                            {
                                rQuestions.map((violation, i) => {
                                    return (
                                        <li key={i} className="py-1">
                                            <input className="inline" type="radio" name="report-type" onClick={() => { setSelection(i) }} />
                                            <p className="inline text-xl pl-2">{violation}</p>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        <input className="w-20 h-12 mt-4 rounded-2xl text-lg" type="submit" value="提交"></input>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ReportContent
