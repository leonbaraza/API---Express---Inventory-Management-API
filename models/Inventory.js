const mongoose = require('mongoose')

const Stock = require('./Stock')

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

inventorySchema.pre('remove', function(next) {
    Stock.find({inventory:this.id}, (err, inventory) => {
        if (err){
            next(err)
        }else if( inventory.length > 0 ){
            next(new Error('This inventory has Stock details. Cannot be deleted'))
        }
        else{
            next()
        }
    })
})

module.exports = mongoose.model('Inventory', inventorySchema)