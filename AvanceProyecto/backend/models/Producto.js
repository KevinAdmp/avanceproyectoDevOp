const mongoose = require("mongoose");


const ProductoSchema = new mongoose.Schema(
    {
        title:{type:String, required:true},
        content:{type:String, required:true},
        completed:{type:Boolean, default:false},
    }
);

module.exports = mongoose.model("Producto", ProductoSchema)