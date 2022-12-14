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
exports.Jam_delete = async function(req, res) {
    console.log("delete " + req.params.id)
    try {
        result = await Jam.findByIdAndDelete( req.params.id)
        console.log("Removed " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": Error deleting ${err}}`);
    }
};
// Handle Jam update form on PUT.
exports.Jam_update_put = async function(req, res) {
    console.log(`update on id ${req.params.id} with body
    ${JSON.stringify(req.body)}`)
    try {
        let toUpdate = await Jam.findById( req.params.id)
        // Do updates of properties
        if(req.body.Jam_type)
            toUpdate.Jam_type = req.body.Jam_type;
        if(req.body.Price) toUpdate.Price = req.body.Price;
        if(req.body.Size) toUpdate.Size = req.body.Size;
        if(req.body.Flavor) toUpdate.Flavor = req.body.Flavor;
        let results = await toUpdate.save();
        console.log("Sucess " + results)
        res.send(results)
    } catch (err) {
        res.status(500)
        res.send(`{"error": ${err}: Update for id ${req.params.id}
    failed`);
    }
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
// Handle a show one view with id specified by query
exports.Jam_view_one_Page = async function(req, res) {
    console.log("single view for id " + req.query.id)
    try{
        result = await Jam.findById( req.query.id)
        res.render('jamdetail',
            {title: 'Jam Detail', toShow: result });
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};
// Handle building the view for creating a costume.
// No body, no in path parameter, no query.
// Does not need to be async
exports.Jam_create_Page = function(req, res) {
    console.log("create view")
    try{
        res.render('jamcreate', { title: 'Jam Create'});
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

// Handle building the view for updating a costume.
// query provides the id
exports.Jam_update_Page = async function(req, res) {
    console.log("update view for item "+req.query.id)
    try{
        let result = await Jam.findById(req.query.id)
        res.render('jamupdate', { title: 'Jam Update', toShow: result });
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

// Handle a delete one view with id from query
exports.Jam_delete_Page = async function(req, res) {
    console.log("Delete view for id " + req.query.id)
    try{
        result = await Jam.findById(req.query.id)
        res.render('jamdelete', { title: 'Jam Delete', toShow:
        result });
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};