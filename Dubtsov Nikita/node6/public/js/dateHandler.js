module.exports = async (todosList) => {
    newList = await todosList.map((todo) => {
        for (key in todo) {
            if (key == 'createdAt') {
                todo[key] = todo[key].toString().slice(0, -21)
            }
        }
    })
}

