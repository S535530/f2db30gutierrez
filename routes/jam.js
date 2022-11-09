var express = require('express');
const jam_controlers= require('../controllers/jam');
var router = express.Router();

/* GET home page. */
router.get('/', jam_controlers.Jam_view_all_Page );
module.exports = router;
