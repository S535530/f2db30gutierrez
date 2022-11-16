var express = require('express');
const jam_controlers= require('../controllers/jam');
var router = express.Router();

/* GET home page. */
router.get('/', jam_controlers.Jam_view_all_Page );
module.exports = router;

/* GET detail jam page */
router.get('/detail', jam_controlers.Jam_view_one_Page);

/* GET create jam page */
router.get('/create', jam_controlers.Jam_create_Page);

/* GET create update page */
router.get('/update', jam_controlers.Jam_update_Page);

/* GET delete jam page */
router.get('/delete', jam_controlers.Jam_delete_Page)