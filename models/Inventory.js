const mongoose = require('mongoose')


const inventorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    inventoryType:{
        type:String,
        required:true
    },
    buyingPrice:{
        type:Number,
    },
    sellingPrice:{
        type:Number
    },
    createdAt:{
        type:Date,
        default:Date.now,
        required:true
    }
})

module.exports = mongoose.model('Inventory', inventorySchema)