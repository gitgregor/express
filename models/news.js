var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// var newsSchema = new Schema({
//     title: { type: String, required: true },
//     description: { type: String, required: true },
//     created: { type: Date, default: Date.now },
// });

var newsSchema = new Schema({
    title: { type: String },
    description: { type: String },
    created: { type: Date, default: Date.now },
});

module.exports = mongoose.model('News', newsSchema);