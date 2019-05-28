const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let categorySchema = new Schema({
    description:{type:String, unique:true, required:true},
    usuario : {type:Schema.Types.ObjectId, ref:'Usuario'}
});

module.exports = mongoose.model('Category', categorySchema);