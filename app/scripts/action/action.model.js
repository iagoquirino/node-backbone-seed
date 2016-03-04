var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Action = new Schema({
        id: { type: mongoose.Schema.ObjectId, required: false, unique: true },
        action: {type: String, required: true },
        totalValue: {type: Number, required: false },
        netValue: {type: Number, required: false },
        taxValue: {type: Number, required: false },
        user: {type: Schema.Types.ObjectId, ref:'User'},
        client: {type: Schema.Types.ObjectId, ref:'Client'},
        date: { type: String, required: true },
        creationTime: { type: String, required: false },
        lastUpdateTime: { type: String, required: false },
        status: { type: String, required: true }
    },
    {collection : 'actions'});

module.exports = mongoose.model('actions', Action);
