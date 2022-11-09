var express = require('express');
const jam_controlers= require('../controllers/jam');
var router = express.Router();
// Require controller modules.
var api_controller = require('../controllers/api');
var jam_controller = require('../controllers/jam');
/// API ROUTE ///
// GET resources base.
router.get('/', api_controller.api);
/// JAM ROUTES ///
// POST request for creating a Jam.
router.post('/jam', jam_controller.Jam_create_post);
// DELETE request to delete Jam.
router.delete('/jam/:id', jam_controller.Jam_delete);
// PUT request to update Jam.
router.put('/jam/:id', jam_controller.Jam_update_put);
// GET request for one Jam.
router.get('/jam/:id', jam_controller.Jam_detail);
// GET request for list of all Jam items.
router.get('/jam', jam_controller.Jam_list);
router.get('/', jam_controlers.Jam_view_all_Page );
module.exports = router;