const mongoose = require("mongoose")
const jamSchema = mongoose.Schema({
    Price: {
        type: Number, min: [1], max: 14,
    },
    Size: {
        type: Number, min: [8], max: 140,
    }, 
    Flavor: {
        type: String
    },
});
module.exports = mongoose.model("Jam", jamSchema)