import React from 'react'

const Error404 = () => {
    return (
        <button onClick={() => { window.location.href = "home" }} className="w-screen h-screen relative bg-accent-blue">
            <div className="absolute top-32 left-32">
                <h1 className="w-min h-min text-[220px] leading-[280px] text-white text-left">404</h1>
                <p className="text-7xl text-left text-white">
                    看來你好像不小心迷路了呢 <br />
                    點擊任意處回到主畫面吧
                </p>
            </div>
        </button>
    )
}

export default Error404
