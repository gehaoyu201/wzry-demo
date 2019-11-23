module.exports = app => {
    const express = require("express")

    const AdminUser = require("../../models/AdminUser")

    const jwt = require("jsonwebtoken")

    const assert = require('http-assert')

    const router = express.Router({
        mergeParams: true
    })
    //增
    router.post('/', async (req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
    })
    //改
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
    //删
    router.delete('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    })
    //查
    router.get('/', async (req, res) => {
        const queryOptions = {}
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(100)
        //populate是查跟它有关联的字段，传入"parent"(也就是关联的ObjectId),就会去查有这个id的那个字段，然后并返回它的json对象
        res.send(items)
    })
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })

    const authMiddleware = require("../../middleware/auth")

    const resourceMiddleware = require("../../middleware/resource")

    app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)

    const multer = require('multer')    //安装multer组件来当中间件
    const upload = multer({ dest: __dirname + '/../../uploads' }) //__dirname一定要加，是绝对地址，表示当前文件所在的路径
    app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
        //upload.single('file')将上传文件的file赋值到req上面去了
        const file = req.file
        file.url = `http://www.nezuko.top/uploads/${file.filename}`
        res.send(file)
    })

    app.post('/admin/api/login', async (req, res) => {
        const { username, password } = req.body
        //1.根据用户名找用户
        const user = await AdminUser.findOne({ username }).select('+password')  //取出字段
        assert(user, 422, "用户不存在")
        // if (!user) {
        //     return res.status(422).send({
        //         message: "用户不存在"
        //     })
        // }
        //2.校验密码
        const isVaild = require('bcrypt').compareSync(password, user.password)
        // if (!isVaild) {
        //     return res.status(422).send({
        //         message: '密码错误'
        //     })
        // }
        assert(isVaild, 422, '密码错误')
        //3.返回token

        const token = jwt.sign({ id: user._id, }, app.get("secret"))    //签名
        res.send({ token })
    })

    //错误处理
    app.use(async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}