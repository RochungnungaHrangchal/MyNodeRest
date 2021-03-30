const mongoose = require('mongoose');

const chengrangSchema= new mongoose.Schema({
    uin:String,
    holdername:String

},{timestamps:true});

module.exports =mongoose.model('Chengrang',chengrangSchema);