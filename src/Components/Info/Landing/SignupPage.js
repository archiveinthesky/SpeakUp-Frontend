import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import LoginTopic from './LoginTopic'
import closedEye from './Images/closed-eye.svg'
import openEye from './Images/open-eye.svg'

const SignUpForm = ({ updateRegStage }) => {
    const location = useLocation()

    const [regStage, setRegStage] = useState(1);
    const [regEmail, setRegEmail] = useState("")
    const [prefilledData, setPrefilledData] = useState([])
    const [errorMsg, setErrorMsg] = useState(null)

    useEffect(() => {
        let searchparams = new URLSearchParams(location.search)
        let onstage = searchparams.has("filledData") ? searchparams.get("filledData") : null
        if (onstage === "true") {
            let lcs = window.localStorage
            let email = lcs.getItem('usremail')
            let pwd = lcs.getItem('usrpwd')
            if (email !== null && pwd !== null) {
                setPrefilledData([email, pwd])
            } else {
                window.location.href = "/signup"
            }
        }
    }, [location.search])

    useEffect(() => {
        updateRegStage(regStage)
    }, [regStage])

    const RegStage1 = () => {
        const [userEmail, setUserEmail] = useState("")
        const [userPwd, setUserPwd] = useState("")
        const [showPwd, setShowPwd] = useState(false)
        const [emailError, setEmailError] = useState(false)
        const [pwdError, setPwdError] = useState([])
        const [disableReg, setDisableReg] = useState(false)

        useEffect(() => {
            if (prefilledData.length !== 0) {
                setDisableReg(true)
                setUserEmail(prefilledData[0])
                setUserPwd(prefilledData[1])
                postRegData(prefilledData)
            }
        }, [])

        const postRegData = (prefilled = null) => {
            setDisableReg(true)
            fetch("http://localhost:8000/api/auth/reg/email/", {
                method: 'POST',
                headers: {
                    'Authorization': localStorage.getItem("AuthToken"),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    (prefilled !== null) ? {
                        "email": prefilledData[0],
                        "password": prefilledData[1]
                    } : {
                        "email": userEmail,
                        "password": userPwd
                    }
                )
            }).then(async response => {
                if (response.status === 201) {
                    let data = await response.json()
                    localStorage.setItem("valtoken", data.valtoken)
                    setErrorMsg(null)
                    setRegStage(2)
                } else if (response.status === 403) {
                    setErrorMsg("封測階段僅開放靜心高中信箱註冊")
                    setRegEmail(userEmail)
                } else if (response.status === 409) {
                    setErrorMsg("此帳號已被註冊過")
                    setRegEmail(userEmail)
                }
                localStorage.removeItem("usremail")
                localStorage.removeItem("usrpwd")
                setPrefilledData([])
            }).catch(error => {
                console.log(error)
            })
        }

        const onEmailReg = (e) => {
            e.preventDefault()
            let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            setEmailError(!re.test(userEmail))
            let pwderrors = [];
            function hasUpperCase(str) {
                return str.toLowerCase() !== str;
            }
            function hasLowerCase(str) {
                return str.toUpperCase() !== str;
            }
            function hasNumber(myString) {
                return /\d/.test(myString);
            }
            if (!hasUpperCase(userPwd)) pwderrors.push("密碼至少需要一個大寫英文字母")
            if (!hasLowerCase(userPwd)) pwderrors.push("密碼至少需要一個小寫英文字母")
            if (!hasNumber(userPwd)) pwderrors.push("密碼至少需要一個數字")
            if (userPwd.length < 8) pwderrors.push("密碼至少需要八個字")
            setPwdError(pwderrors)
            if (!re.test(userPwd) && pwderrors.length === 0) {
                postRegData()
            }
        }

        return (
            <>
                <form onSubmit={onEmailReg}>
                    {(errorMsg !== null) && <p className='mt-2 text-xl text-red-500'>{errorMsg}</p>}
                    <input type='email'
                        value={userEmail}
                        onChange={(e) => { setUserEmail(e.target.value) }}
                        className="w-full h-16 my-3 px-6 border-2 border-black rounded-3xl text-black text-2xl hover:drop-shadow-lg" placeholder='您的電子郵件'
                    />
                    {emailError && <p className='font-rounded text-red-500 text-lg'>請輸入一個有效的信箱</p>}
                    <div className='relative'>
                        <input type={showPwd ? 'text' : 'password'}
                            value={userPwd}
                            onChange={(e) => { setUserPwd(e.target.value) }}
                            className='w-full h-16 my-3 px-6 border-2 border-black rounded-3xl text-black text-2xl shrink-0 hover:drop-shadow-lg' placeholder='您的密碼'
                        >
                        </input>
                        <button type='button' onClick={() => { setShowPwd(!showPwd) }} className="absolute top-7 right-6">
                            <img className="w-7 h-7" src={showPwd ? openEye : closedEye} alt=""></img>
                        </button>
                    </div>
                    {pwdError.length !== 0 &&
                        <ul>
                            {pwdError.map((eacherror, i) => {
                                return (<p key={i} className='font-rounded text-red-500 text-lg'>{eacherror}</p>)
                            })}
                        </ul>
                    }
                    <button className='w-full h-16 my-3 bg-blue-600 rounded-3xl hover:drop-shadow-lg disabled:bg-blue-300 disabled:drop-shadow-none' type='submit' disabled={disableReg}>
                        <div className='m-auto'>
                            <p className='text-center text-white text-2xl font-rounded'>使用電子郵件信箱註冊</p>
                        </div>
                    </button>
                </form>
                {/* <div className='w-full my-3 flex justify-center items-center'>
                    <hr className='w-48 bg-black h-[2px]' />
                    <p className='mx-2 text-black text-2xl font-rounded'>或</p>
                    <hr className='w-48 bg-black h-[2px]' />
                </div>
                <button className='w-full h-16 bg-white border-2 rounded-3xl hover:drop-shadow-lg disabled:drop-shadow-none' type='submit' disabled={disableReg} >
                    <div className='m-auto flex justify-center'>
                        <svg className=' w-11 h-11' viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M46.06 23.678C46.0614 22.0901 45.9184 20.5052 45.6328 18.9424H23.5V27.898H36.1473C35.6025 30.792 33.9469 33.244 31.458 34.8856V40.6946H39.0528C43.4964 36.6641 46.06 30.7288 46.06 23.678Z" fill="#4285F4" />
                            <path d="M23.5 46.3036C29.845 46.3036 35.1646 44.2304 39.0527 40.6945L31.458 34.8855C29.3536 36.2746 26.6618 37.0954 23.5 37.0954C17.3793 37.0954 12.1986 33.0228 10.3507 27.5505H2.49951V33.549C6.36632 41.1155 14.3136 46.3036 23.5 46.3036Z" fill="#34A853" />
                            <path d="M10.3507 27.5507C9.36798 24.698 9.36798 21.6057 10.3507 18.753V12.7545H2.49956C0.85592 15.9812 0 19.5416 0 23.1518C0 26.7621 0.85592 30.3224 2.49956 33.5491L10.3507 27.5507Z" fill="#FBBC05" />
                            <path d="M23.5 9.20812C26.9502 9.20812 30.0479 10.3762 32.4834 12.6704L39.2236 6.03C35.1538 2.29412 29.8342 0 23.4999 0C14.3136 0 6.36632 5.18815 2.49951 12.7545L10.3507 18.7531C12.1986 13.2808 17.3793 9.20816 23.5 9.20816V9.20812Z" fill="#EA4335" />
                        </svg>
                        <p className='mx-4 my-auto text-center text-black text-xl'>Continue with Google</p>
                    </div>
                </button> */}
            </>
        )
    }

    const RegStage2 = () => {
        const [valcode, setValcode] = useState("")
        const [resendCd, setResendCd] = useState(30)
        const [resent, setResent] = useState(false)
        const [errorMsg, setErrorMsg] = useState(null)

        useEffect(() => {
            if (prefilledData.length !== 0) {
                localStorage.removeItem("usremail")
                localStorage.removeItem("usrpwd")
                setPrefilledData([])
            }
        }, [])

        const submitValcode = (e) => {
            e.preventDefault()
            fetch("http://localhost:8000/api/auth/reg/validate/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "valcode": valcode,
                    "valtoken": localStorage.getItem("valtoken")
                })
            }).then(async response => {
                if (response.status === 200) {
                    let data = await response.json()
                    localStorage.setItem("AuthToken", "Token " + data.Token)
                    setErrorMsg(null)
                    setRegStage(3)
                } else if (response.status === 400) {
                    let data = await response.json()
                    if (data.Error === "Validation Token Invalid") setErrorMsg("發生錯誤，請重新註冊")
                    else if (data.Error === "Validation Failed") setErrorMsg("驗證碼錯誤，請再試一次")
                    else setErrorMsg(data.Error)
                    setValcode("")
                } else if (response.status === 429) {
                    setErrorMsg("您輸入過多錯誤的驗證碼，請重新註冊")
                }
            }).catch(error => {
                console.log(error)
            })
        }

        const resendValCode = () => {
            console.log("resending")
            setResent(true)
            fetch("http://localhost:8000/api/auth/reg/resendemail/", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'valtoken': localStorage.getItem("valtoken")
                })
            }).then(response => {
                if (response.status === 200) {
                    setResendCd(30)
                }
                setResent(false)
            })
        }

        useEffect(() => {
            if (resendCd >= 0) {
                setTimeout(() => { setResendCd(resendCd - 1) }, 1000)
            }
        }, [resendCd])

        return (
            <div>
                <p className='my-2 text-2xl font-rounded'>我們已經將驗證碼傳送至{regEmail}，請輸入信件中的六位數驗證碼。若您未收到驗證信，請檢查您的垃圾郵件資料夾</p>
                <p className='my-2 text-xl font-rounded'>
                    未收到驗證信？{resendCd > 0 ?
                        `請於${resendCd}秒後重試一次` :
                        <button className='text-blue-500' disabled={resent} onClick={resendValCode}>重新寄送</button>
                    }
                </p>
                {(errorMsg !== null) && <p className='mt-2 text-xl text-red-500'>{errorMsg}</p>}
                <form onSubmit={submitValcode}>
                    <input type='text'
                        onChange={(e) => { setValcode(e.target.value) }}
                        className="w-full h-16 my-3 px-6 border-2 border-black rounded-3xl text-black text-2xl hover:drop-shadow-lg" placeholder='六位數驗證碼'
                    />
                    <button className='w-full h-16 my-3 bg-blue-600 rounded-3xl transition-colors duration-150 hover:drop-shadow-lg disabled:bg-blue-300 disabled:drop-shadow-none'
                        type='submit' disabled={valcode.length !== 6} >
                        <div className='m-auto'>
                            <p className='text-center text-white text-2xl font-rounded'>驗證</p>
                        </div>
                    </button>
                </form>
            </div>
        )
    }

    const RegStage3 = () => {
        const [userName, setUserName] = useState("")
        const [userNameError, setUserNameError] = useState([])
        const [ageRange, setAgeRange] = useState("0")
        const [ageError, setAgeError] = useState(false)
        const [gender, setGender] = useState("gender")
        const [genderError, setGenderError] = useState(false)


        const validateUserName = () => {
            let usernameerrors = []
            if (userName.length < 2) usernameerrors.push("請輸入兩個字以上的使用者名稱")
            if (userName.length > 20) usernameerrors.push("請輸入二十個字以下的使用者名稱")
            if (userName === "hey") usernameerrors.push("此使用者名稱已被註冊，請換一個使用者名稱")
            setUserNameError(usernameerrors)
        }

        const submitUserData = (e) => {
            e.preventDefault()
            let cansubmit = true
            validateUserName()
            if (userNameError.length !== 0) cansubmit = false
            if (ageRange === "0") {
                setAgeError(true)
                cansubmit = false
            }
            if (gender === "gender") {
                setGenderError(true)
                cansubmit = false
            }
            if (cansubmit === true) {
                fetch("http://localhost:8000/api/auth/reg/info/", {
                    method: 'POST',
                    headers: {
                        'Authorization': localStorage.getItem("AuthToken"),
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "username": userName,
                        "ageRange": ageRange,
                        "gender": gender
                    })
                }).then(async response => {
                    if (response.status === 200) {
                        window.location.href = "/home"
                    } else if (response.status === 400) {
                        let data = await response.json()
                        if (data.Error === "Username taken") setUserNameError(["此使用者名稱已被註冊"])
                        if (data.Error === "Unauthed") setUserNameError("發生錯誤，請重新註冊")
                        else setErrorMsg(data.Error)
                    }
                }).catch(error => {
                    console.log(error)
                })
            }
        }

        return (
            <div>
                <form onSubmit={submitUserData}>
                    <p className='mt-8 font-rounded text-black text-2xl'>您的使用者名稱</p>
                    <input type='text'
                        onChange={(e) => { setUserName(e.target.value) }}
                        onBlur={validateUserName}
                        className="w-full h-16 mt-3 mb-2 px-6 border-2 border-black rounded-3xl text-black text-2xl hover:drop-shadow-lg" placeholder='使用者名稱'
                    />
                    {userNameError.map((error) => { return <p className='font-rounded text-red-500 text-lg'>{error}</p> })}
                    <p className='mt-4 font-rounded text-black text-2xl'>您的年齡</p>
                    <select
                        onChange={(e) => { setAgeRange(e.target.value); setAgeError(false) }}
                        value={ageRange}
                        className="w-full h-16 mt-3 mb-2 px-6 border-2 border-black rounded-3xl text-black text-2xl hover:drop-shadow-lg"
                    >
                        <option value="0" disabled>您的年齡</option>
                        <option value="1">13-18歲</option>
                        <option value="2">19-30歲</option>
                        <option value="3">31-40歲</option>
                        <option value="4">41-50歲</option>
                        <option value="5">51-60歲</option>
                        <option value="6">61歲以上</option>
                    </select>
                    {ageError && <p className='font-rounded text-red-500 text-lg'>請選擇您的年齡</p>}
                    <p className='mt-4 font-rounded text-black text-2xl'>您的性別</p>
                    <select
                        onChange={(e) => { setGender(e.target.value); setGenderError(false) }}
                        value={gender}
                        className="w-full h-16 mt-3 mb-2 px-6 border-2 border-black rounded-3xl text-black text-2xl hover:drop-shadow-lg"
                    >
                        <option value={"gender"} disabled>您的性別</option>
                        <option value={"1"}>男性</option>
                        <option value={"2"}>女性</option>
                        <option value={"3"}>非二元性別</option>
                        <option value={"4"}>不願透露</option>
                    </select>
                    {genderError && <p className='font-rounded text-red-500 text-lg'>請選擇您的性別</p>}
                    <button className='w-full h-16 my-3 bg-blue-600 rounded-3xl transition-colors duration-150 hover:drop-shadow-lg disabled:bg-blue-300 disabled:drop-shadow-none'
                        type='submit' >
                        <div className='m-auto'>
                            <p className='text-center text-white text-2xl font-rounded'>開始使用Speakup</p>
                        </div>
                    </button>
                </form>
            </div>
        )
    }

    return (
        <div className='w-full h-full overflow-y-auto xl:pl-6 pr-2 2xl:px-14 '>
            <h2 className='my-3 text-4xl text-black font-rounded'>{regStage === 1 ? "歡迎加入Speakup!" : regStage === 2 ? "信箱驗證" : "您的資料"}</h2>
            {regStage === 1 &&
                <>
                    <p className='text-lg text-black'>已經有帳號了？<Link className='text-blue-600' to="../login">登入</Link></p>
                    <RegStage1 />
                </>
            }
            {regStage === 2 && <RegStage2 />}
            {regStage === 3 && <RegStage3 />}
        </div>
    )
}

const SignupPage = () => {
    const [signupStage, setSignupStage] = useState(0)
    const signupstage2 = ["您的驗證信正在寄出的路上", ["如果您沒有收到驗證信，請檢查您的垃圾郵件資料夾。", "若您還是沒有收到，請等待30秒後點選右方的重新寄送按鈕"]]
    const signupstage3 = ["我們會如何使用您的資料", ["在封閉測試結束之後，所有資料會全數刪除，僅留各位同學的回饋給我們",
        "如果有留言或使用者帳戶有不雅言語，我們也會透過電子郵件來確定您的身份，因此在留言時請勿發表不適當的言論"]]

    return (
        <div className='w-screen h-screen bg-accent-blue flex'>
            <div className='w-10/12 py-[5vh] xl:py-0 xl:w-11/12 2xl:w-5/6 xl:h-5/6 m-auto bg-white rounded-[40px] flex'>
                <div className='w-11/12 md:w-5/6 xl:w-11/12 2xl:w-5/6 xl:h-4/6 m-auto xl:grid xl:grid-cols-2 xl:justify-center'>
                    <div className='hidden xl:block'>
                        <LoginTopic title={signupStage === 2 ? signupstage2[0] : (signupStage === 3) ? signupstage3[0] : null}
                            contents={signupStage === 2 ? signupstage2[1] : (signupStage === 3) ? signupstage3[1] : null}
                        />
                    </div>
                    <SignUpForm updateRegStage={setSignupStage} />
                </div>
            </div>
        </div>
    )
}

export default SignupPage
