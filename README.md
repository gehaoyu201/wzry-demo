#王者荣耀手机端官网和管理后台
1.初始化项目(建文件夹)
mkdir server		用来存放服务端项目

//需要先安装vue cli
//命令为	npm i -g @vue/cli
//之后执行
vue create web		手机端界面
vue create admin	后台管理界面

2.初始化server
进server文件夹npm init -y
之后新建了一个index.js作为入口文件
在package.json自定义了个serve的脚本启动	"server":"nodemon index.js"
nodemon需要安装，最好全局安装,命令npm install nodemon -g
nodemon可以自动重启node.js文件

3.后台界面
cd admin，然后npm run serve启动
后台界面用ElementUI来搭建
安装ElementUI命令：vue add element
安装路由：vue add router

4.生产环境编译
不进行任何配置，默认通过npm run build进行编译，编译完成后此目录下会有一个dist文件夹

admin目录下修改http.js里的baseURL为baseURL:process.env.VUE_APP_API_URL || '/admin/api'，将localhost:3000改成一个动态的地址，不含主机名的绝对地址，新建.env.development文件，表示开发环境下用到的vue的一些变量，在里面输入：VUE_APP_API_URL=localhost:3000/admin/api，新建一个vue.config.js,里面填写：
module.exports = {
    outputDir:__dirname+'/../server/admin',
    publicPath:process.env.NODE_ENV === 'production' ? '/admin/' : '/'          
}
在server目录下的index.js定义一个静态文件托管




