const PendingBoards = () => {
    return (
        <div className='relative w-1/3 h-[19rem] bg-white rounded-2xl'>
            <div className='absolute top-0 left-0 w-full h-5 bg-accent-blue rounded-t-2xl' />
            <div className='w-5/6 mt-10 mx-auto'>
                <h2 className='text-3xl'>網路匿名</h2>
                <p className='h-36 overflow-hidden my-3'>Exercitation occaecat adipisicing eiusmod aute aute sint ad mollit officia veniam consectetur irure dolore. Occaecat aliquip excepteur laboris anim. Voluptate cillum eiusmod commodo cillum quis aliquip esse. Culpa sit commodo tempor consectetur. Sunt eiusmod commodo aliquip cupidatat. Amet eu cillum labore laboris elit dolor nulla minim reprehenderit ad amet cillum dolore. Culpa excepteur ut aute adipisicing est laborum ut labore laborum pariatur magna. Ea tempor culpa consectetur ad elit amet dolor. Laborum ex non veniam et Lorem est irure tempor tempor ut Lorem est Lorem.</p>
                <button className='px-3 py-1 my-1 bg-accent-blue rounded-3xl'>
                    <p className='font-light m-auto text-white'>進入管理</p>
                </button>
            </div>
        </div>
    )
}

export default PendingBoards
