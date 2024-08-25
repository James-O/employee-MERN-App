const mongoose = require('mongoose')
//upload image
const ImageSchema = new mongoose.Schema({
    image:String,
})

const ImageModel = mongoose.model('image',ImageSchema)

module.exports = ImageModel