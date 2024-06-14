const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    
pname:String,
price:Number,
Description:String,
imgurl:String,
p_id:Number
});

module.exports = mongoose.model('Product', ProductSchema);