var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Client = new Schema({
        id: { type: mongoose.Schema.ObjectId, required: false, unique: false },
        document: { type: String, required: true },
        fullname: { type: String, required: true },
        email: { type: String, required: true },
        address: { type: Object, required: true },
        gender: { type: String, required: true },
        birthdate: { type: String, required: true },
        user: {type: Schema.Types.ObjectId, ref:'User'},
        creationTime: { type: String, required: false },
        lastUpdateTime: { type: String, required: false },
        status: { type: String, required: true }
	},
	{collection : 'client'});

module.exports = mongoose.model('client', Client);
