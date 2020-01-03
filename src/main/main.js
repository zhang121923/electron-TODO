// 引入模块
const {app, BrowserWindow} = require('electron');
const path = require('path');

const isDev = () => {
    return process.env['NODE_ENV'] === 'development'
}

let win;

const createWindow = () => {
    win = new BrowserWindow({
        title: 'electron-TODO',
        icon: 'favicon.ico',
        width: 800,
        height: 600,
        minWidth: 365,
        autoHideMenuBar: true,
        webPreferences: {
            javascript: true,
            nodeIntegration: true,
            preload: path.join(__dirname, '../shared/preload.js')
        }
    })

    //加载模板
    if (isDev()) {
        // 开发环境则加载开发时webpack-dev-server提供的服务地址
        win.loadURL('http://127.0.0.1:8080');
    } else {
        // 生产环境则加载指定的编译文件
        // win.loadFile(path.join(__dirname, '../', '../', 'dist', 'renderer', 'index.html'))
        win.loadURL({
            pathname: path.join(__dirname, '../', '../', 'dist', 'renderer', 'index.html'),
            protocol: 'file:',
            slashes: true
        });
    }

    // 打开开发者工具
    win.webContents.openDevTools();

    //改变大小
    win.on('resize', () => {
        win.webContents.send('window-resize', true);
    })

    // 关闭事件
    win.on('close', () => {
        win = null;
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    // macOS
    if (process.platform !== 'drawin') {
        app.quit();
    }
})

app.on('active', () => {
    if (win !== null) {
        createWindow()
    }
})
