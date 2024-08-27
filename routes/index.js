var express = require('express');
var router = express.Router();
const bookController = require('../controllers/book');
router.post('/import', bookController.import);

module.exports = router;