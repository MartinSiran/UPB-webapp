const express = require('express');
const router = express.Router();
const database = require('../database')
const fileShare = require('../file_share/fileShare')

/* GET files listing. */
router.get('/:fileId', function(req, res, next) {
  return fileShare.getFile(res, req.params.fileId)
});

module.exports = router;
