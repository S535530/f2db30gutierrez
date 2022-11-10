var Jam = require('../models/jam');
// List of all Jam
exports.Jam_list = async function (req, res) {
    try {
        theJam = await Jam.find();
        res.send(theJam);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};
// for a specific Jam.
exports.Jam_detail = async function(req, res) {
    console.log("detail" + req.params.id)
    try {
        results = await Jam.findById( req.params.id)
        res.send(results)
    } catch (error) {
        res.status(500)
        res.send(`{"error": document for id ${req.params.id} not found`);
    }
};
// Handle Jam create on POST.
exports.Jam_create_post = async function (req, res) {
    console.log(req.body)
    let document = new Jam();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    document.Price = req.body.Price;
    document.Flavor = req.body.Flavor;
    document.Size = req.body.Size;

    try {
        let results = await document.save();
        res.send(results);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};
// Handle Jam delete form on DELETE.
exports.Jam_delete = function (req, res) {
    res.send('NOT IMPLEMENTED: Jam delete DELETE ' + req.params.id);
};
// Handle Jam update form on PUT.
exports.Jam_update_put = function (req, res) {
    res.send('NOT IMPLEMENTED: Jam update PUT ' + req.params.id);
};
exports.Jam_view_all_Page = async function (req, res) {
    try {
        theJam = await Jam.find();
        res.render('jam', { title: 'Jam Search Results',  results: theJam });
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};