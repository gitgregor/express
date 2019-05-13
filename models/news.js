var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// var newsSchema = new Schema({
//     title: { type: String, required: true },
//     description: { type: String, required: true },
//     created: { type: Date, default: Date.now },
// });

var newsSchema = new Schema({
    title: { type: String, required: [true, 'Pole Tytuł jest wymagane'] },
    description: { type: String, required: [true, 'Pole Opis jest wymagane'] },
    created: { type: Date, default: Date.now },
});

module.exports = mongoose.model('News', newsSchema);