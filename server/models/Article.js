const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    title: { type: String },
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],  //ref用来指定关联的哪个模型
    //多个分类所以用中括号括起来，表示数组分类
    body: { type: String },
}, {
    //时间戳，自己带创建时间和更新时间
    timestamps: true
})
module.exports = mongoose.model('Article', schema)