const express = require('express');
const router = express.Router()
const fileShare = require ('../file_share/fileShare')

router.post('/', async function(req, res, next) {
  const users = JSON.parse(req.body.users);
  const file = req.files.file;

  try {
    await fileShare.shareFileWithUsers(users, file.name, file.data)
    res.sendStatus(200)
  } catch (error) {
    return res.sendStatus(500)
  }
});

router.get('/:userId', function(req, res, next) {
  // console.log(req.params.userId)
  return fileShare.getFilesForUser(res, req.params.userId)
});

module.exports = router;
