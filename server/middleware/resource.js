module.exports = options => {
    return async (req, res, next) => {
        //通过引入inflection包来使用classify方法来转换字符为首字母大写，若结尾带s还能去掉s
        const modelName = require('inflection').classify(req.params.resource)
        req.Model = require(`../models/${modelName}`)
        next()
    }
}