const mongoose = require('mongoose')
// var MONGODB_URI = process.env.MONGODB_URL || "mongodb://localhost/orbitDB"
var MONGODB_URI = "mongodb://localhost/orbitDB"
const options = {
    family: 4 // Use IPv4, skip trying IPv6
}
const itemsSchema = {
    name: String,
    value: String
}
const Item = new mongoose.model("item",itemsSchema)

Item.find({}, (err,doc) => {
    if(err){
        console.log(err)
    }else{
        if(doc.length === 0){
            Item.create({name : "prefix",value : "!"}, (Err) => {
                console.log(Err)
            })
        }
    }
})
  
exports.run = async (bot, message, args) => {
    mongoose.connect(MONGODB_URI,options)
    console.log(args[0])
    if(args.length > 0){
        Item.findOneAndUpdate({name : "prefix"}, {value : args[0]}, {new: true},(err,doc)=>{console.log(doc)})
    }
}

exports.help = {
    name:"gif",
    description: "Changes the prefix for the bot.",
    syntax: "<required> [optional]"
}

module.exports = {
    itemsSchema,Item
}