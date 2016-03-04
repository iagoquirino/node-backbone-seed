var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    id: { type: mongoose.Schema.ObjectId, required: false },
    document: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: Object, required: true },
    gender: { type: String, required: true },
    creationTime: { type: String, required: false },
    lastUpdateTime: { type: String, required: false },
    status: { type: String, required: true }
},{collection : 'user'});

module.exports = mongoose.model('user', User);
