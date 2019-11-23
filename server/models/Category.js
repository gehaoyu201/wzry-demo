const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    name: { type: String },
    parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }  //ref用来指定关联的哪个模型
})

schema.virtual('children', {
    localField: '_id',
    foreignField: 'parent',
    justOne: false,
    ref: 'Category'
})
module.exports = mongoose.model('Category', schema)