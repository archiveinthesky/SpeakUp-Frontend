import React from 'react'
import LogoAqua from './Images/logo-aqua.svg'


const LoginTopic = () => {
    return (
        <div className='relative w-full h-4/6'>
            <img className='absolute -top-24 left-0 w-60' src={LogoAqua} alt="Speakup Logo"></img>
            <div className='w-11/12 h-[45vh] mt-24 px-10 py-9 overflow-y-auto overflow-scrollbar-hide bg-logo-aqua rounded-[40px]'>
                <h1 className='text-4xl text-white font-rounded'>Youtube隱藏倒讚</h1>
                <hr className='mt-4 w-full h-[1px] bg-white' />
                <p className='text-xl text-white my-4 font-rounded leading-8'>在十一月的時候，YouTube宣布不再公開顯示影片的倒讚數量，而使用者仍可按倒讚鈕、創作者可從後台查看數據。儘管此政策是為了避免創作者被受攻擊、有挫敗感等，官方宣布和解釋的影片在系統更改前就有將近18 萬的「倒讚」。</p>
                <p className='text-xl text-white my-4 font-rounded leading-8'>官方影片中Youtube團隊表示，隱藏倒讚是保護創作者、提供話語權、減少網路攻擊的政策。研究團隊發現，有部分使用者常常因為不喜歡該創作者或是不同立場，而將倒讚數量視為一種遊戲、一種攻擊。在2021年初，將倒讚數不公開的實驗中，結果顯示這種「惡意倒讚攻擊」因此減少許多。現行政策中，創作者總是迫於外在壓力而無法自主選擇是否關閉讚數公開的顯示，這則成為平台責任去主動提供這層保護。儘管有人會質疑這樣如何得知一部影片是否值得觀看，數據顯示倒讚數量是否顯示對於一個影片觀看人數並無影響關係，且仍然有讚數和留言供參考。最重要的是，大眾無法看到倒讚數量有助於減少創作者的壓力和身心問題，並擁有發表作品的安全感。</p>
                <p className='text-xl text-white my-4 font-rounded leading-8'>影片下方的留言區充滿反對的聲浪，普遍認為這實際上只會提供品質不佳的話語權而禁止真正有意義的。儘管有留言可以參考，創作者卻可以從後台選擇性移除，而倒讚終究是辨認負面內容最快、最簡單的方法。倒讚數的顯示對創作者不只是壓力，也是做出高品質影片的動力；減少這份監督只會助長許多品質低落的作品，甚至是假消息的散布、誘餌式標題、詐騙訊息等，反而會造成平台風氣敗壞。更有人認為，隱藏倒讚事實上是企圖保護業配影片、廣告廠商和各種商業合作；當不再有倒讚數供使用者參考，能使更多廠商進駐，且Youtube廣告收益增加。</p>
            </div>
        </div>
    )
}

export default LoginTopic
