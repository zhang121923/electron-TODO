```
小笔记
electron-forge 简易的工具包，可以快速开发electron开发环境
electron-builder 完备的应用打包和分发解决方案
electron-react-boilerplate 从一个简单的模板开始购建，内部使用了electron-builder
Awesome Electron(https://github.com/sindresorhus/awesome-electron#boilerplates) 提供选择工具和模板
```

### 随笔

#### 环境搭建
    整体环境自行搭建，不使用其他脚手架。主要步骤如下：
1、`npm init`初始化项目，指定`main`文件
2、结构化代码结构，将源码全部放在`src`文件下，区分主进程代码`main`和渲染进程代码`renderer`
3、渲染进程代码加入第三方资源，包括字体文件和图片资源
4、使用`webpack`进行打包，区分两者进程分别打包
5、开发环境指明`NODE_ENV`（引入`cross-env`模块），并且区分两进程，渲染进程和主进程分别是两个`node`服务进程，这也是为什么`npm `中有两个`start`命令的原因
6、启动顺序先需启动渲染进程，主进程通过`loadURL('http://127.0.0.1:8080)`方法将渲染进程热更新的前端界面加载进来


#### 遇到的问题汇总
1、如何热更新？
* 处理： 区分两进程，渲染进程就是个简单的前端项目，使用常用的`webpack-dev-server`模块启动本地服务，执行热更新
        主进程暂定
        
2、字体文件载入？
* 处理： 使用`file-loader`模块，指定打包路径与代码中使用路径相同
        
3、`jsx`文件中图片引用？使用了`file-loader`老是加载不正确？
* 处理：`jsx`同`html`文件一样，`webpack`是无法直接获知代码中直接引用的图片路劲的，所以需要在使用到图片的地方，使用模块加载将图片资源加载进来。例如： `import img from './imgs/user.jpg'`

4、`scss`文件中使用循环`@for`，总是无法成功遍历被遍历数组的项？
* 处理： 需要遍历每一项获取到其值，可以使用`@each`方法.
使用技巧： 
```
@each $item in $consts {
    // $item 就是每一项
    $index: index($consts, $item); // 下标  
}
```

5、渲染进程与主进程通信时使用到`electron`模块中的`ipcRnederer`对象，需要在渲染进程即前端页面引入`node`模块中的`electron`模块，
故需在`index。html`中`<script>window.electron = require('electron')</script>`。可是前端页面无法识别`node`模块化中的`require`，
会报`ReferencesException: require is not undefined`异常，怎么破？
* 处理： 在主进程配置渲染进程实例`BrowserWindow`时指定`webPreferences`中的`nodeIntegration`为`true`，即:
```
    win = new BrowserWindow({
        // XXX 配置
        webPreferences: {
            nodeIntegration: true, // 该值默认为false
        },
        // XX配置
    })
```
（注：在某些框架中，即使指定`nodeIntegration`为`true`，依然会报`require`错误，可能是因为框架自身存在`require`, 所以我们需要全局修改`require`引用）

6、使用到ipcRenderer清除监听事件`removeListener`时，只指定事件名`channel`时会报错：`events.js:63 Uncaught TypeError [ERR_INVALID_ARG_TYPE]: The "listener" argument must be of type Function. Received type undefined`？
* 处理： 报错实际说明了，`removeListener`函数有两个参数：事件名和回调函数， 这个回调函数是一个必须参数，即使无需做什么，但这个参数还需要提供（空函数）

7、报`Support for the experimental syntax 'classProperties' isn't currently enabled `错误？
* 处理： 引入`@babel/plugin-proposal-class-properties`插件，并在`webpack`配置`js`项中加入`plugins`列表中
