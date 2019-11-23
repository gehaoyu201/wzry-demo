module.exports = app => {
    const mongoose = require("mongoose")
    mongoose.connect("mongodb://127.0.0.1:27017/wzry", {
        useNewUrlParser: true
    })

    //cnpm i require-all
    require('require-all')(__dirname + '/../models')

}
