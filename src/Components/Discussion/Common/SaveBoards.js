const SaveBoard = (boardid, saveStat) => {
    fetch('http://localhost:8000/api/boards/save/', {
        method: 'PUT',
        headers: {
            'Authorization': localStorage.getItem("AuthToken"),
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