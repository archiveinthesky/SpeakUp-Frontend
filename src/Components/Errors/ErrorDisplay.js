import React, { useState } from 'react'

const ErrorDisplay = () => {
    const [errors, setErrors] = useState([])

    const errorLogger = (errortext) => {
        setErrors(errors.concat(errors, [errortext]))
        setTimeout((errortext) => {
            let newerrors = errors.splice(errors.indexOf(errortext))
            setErrors(newerrors)
        }, 2000)
    }


    return (
        <div className='absolute top-4 right-4 flex flex-col gap-4 z-20'>
            {errors.map((error) => {
                return (
                    <div className='w-72 h-20 rounded-xl bg-red-200 border-2 border-red-500'>
                        <div className='mx-4 my-2'>
                            <h1 className='text-xl text-red-500'>發生錯誤</h1>
                            <p>{error}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ErrorDisplay;