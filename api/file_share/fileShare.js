const database = require('../database')

const getFile = (res, fileId) => {
    const query = "SELECT name, file FROM files WHERE id=(?)"
    database.query(query, [fileId], (error, data) => {
        if (error) {
            return res.sendStatus(500)
        }
        return res.send({fileName: data[0].name, file: data[0].file})
    })
}

const getFilesForUser = (res, userId) => {
    const query = "SELECT f.id, f.name FROM files f JOIN user_files uf ON f.id=uf.file_id WHERE uf.user_id=(?)"
    database.query(query, [userId], (error, data) => {
        if (error) {
            return res.sendStatus(500)
        }
        return res.send(data)
    })
}

const saveFile = async (fileName, file) => {
    const query = "INSERT INTO files (name, file) VALUES (?,?)"
    return new Promise((resolve, reject) => {
        database.query(query, [fileName, file], (error, data) => {
            if (error) {
                reject(error)
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

const shareFileWithUsers = async (users, fileName, file) => {
    let fileId = await saveFile(fileName, file)
    users.forEach((userId) => {
        shareFileWithUser(userId, fileId)
    })
}

module.exports = { getFilesForUser: getFilesForUser, shareFileWithUsers: shareFileWithUsers, getFile: getFile }
