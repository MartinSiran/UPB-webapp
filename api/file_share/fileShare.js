const database = require('../database')

const getFilesForUser = (res, userId) => {
    const query = "SELECT f.file FROM files f JOIN user_files uf ON f.id=uf.file_id WHERE uf.user_id=(?)"
    database.query(query, [userId], (error, data) => {
        if (error) {
            return res.sendStatus(500)
        }
        return res.send(data)
    })
}

const saveFile = async (file) => {
    const query = "INSERT INTO files (file) VALUES (?)"
    return new Promise((resolve, reject) => {
        database.query(query, [file], (error, data) => {
            if (error) {
                throw error
            }
            resolve(data.insertId)
        })
    })
}

const shareFileWithUser = (userId, fileId) => {
    const query = "INSERT INTO user_files (user_id, file_id) VALUES (?,?)"
    database.query(query, [userId, fileId], (error, data) => {
        if (error) {
            throw error
        }
        return data.insertId
    })
}

const shareFileWithUsers = async (users, file) => {
    let fileId = await saveFile(file)
    users.forEach((userId) => {
        shareFileWithUser(userId, fileId)
    })
}

module.exports = { getFilesForUser: getFilesForUser, shareFileWithUsers: shareFileWithUsers }
