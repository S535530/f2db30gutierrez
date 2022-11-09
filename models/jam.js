const mongoose = require("mongoose")
const jamSchema = mongoose.Schema({
    Price: Number,
    Size: Number, 
    Flavor: String
})
module.exports = mongoose.model("Jam", jamSchema)