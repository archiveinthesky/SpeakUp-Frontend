const SaveBoard = (boardid, saveStat) => {
    fetch('http://127.0.0.1:8000/api/boards/save/', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "boardId": boardid,
            "save": saveStat
        })
    })
}

export default SaveBoard