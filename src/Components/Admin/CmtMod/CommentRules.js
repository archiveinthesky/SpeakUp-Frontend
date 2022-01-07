const CommentRules = ({ rHeight = 0 }) => {
    console.log(rHeight)

    return (
        <div style={{ height: rHeight + 56 }} className="absolute -top-14 w-11/12 p-6 overflow-y-scroll overflow-scrollbar-hide rounded-3xl border-2 border-gray-400">
            <h3 className="mb-2 text-2xl">Speakup 留言規範</h3>
            <p className="my-2 leading-[1.3rem]">Irure ullamco mollit Lorem nisi voluptate consectetur ad. Ut irure ad voluptate officia labore nulla pariatur aliqua Lorem. Deserunt non aliqua voluptate proident do. Ea cupidatat elit do excepteur cupidatat aute enim reprehenderit. Enim ad commodo nulla fugiat deserunt ex do.</p>
            <p className="my-2 leading-[1.3rem]">Amet velit mollit eiusmod et non minim. Deserunt adipisicing aliquip exercitation enim. Est duis incididunt tempor sit nostrud enim enim eu aliqua Lorem adipisicing. Exercitation laboris anim est occaecat ut in id dolor tempor commodo. Qui anim sunt proident dolor exercitation. Laboris duis magna ut laboris dolore duis do est proident. Est non labore sint consectetur irure magna magna quis ea culpa consectetur.</p>
            <p className="my-2 leading-[1.3rem]">Irure ullamco mollit Lorem nisi voluptate consectetur ad. Ut irure ad voluptate officia labore nulla pariatur aliqua Lorem. Deserunt non aliqua voluptate proident do. Ea cupidatat elit do excepteur cupidatat aute enim reprehenderit. Enim ad commodo nulla fugiat deserunt ex do.</p>
        </div>
    )
}

export default CommentRules
