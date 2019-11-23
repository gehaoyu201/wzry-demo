const mongoose = require("mongoose")
const schema = new mongoose.Schema({
    username: { type: String },
    password: {
        type: String,
        select: false,
        set: function (val) {
            return require('bcrypt').hashSync(val, 10)
            //bcrypt散列加密，第二个参数是加密指数
        }
    },
})
module.exports = mongoose.model("AdminUser", schema)
