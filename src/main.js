const { app, BrowserWindow, dialog, ipcMain, globalShortcut } = require('electron')
const path = require('path')
const isDev = require("electron-is-dev")


/**
 * 主进程和渲染双向通信
 */
async function handleOpen(){
    const { canceled, filePaths } = await dialog.showOpenDialog()
    if(canceled){
        return
    }else{
        return filePaths[0]
    }
}


const createWindow = () => {
    // 创建浏览器窗口
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        },
        icon:"public/custom_favicon.png"
    })

    // // 并且为你的应用加载index.html
    // mainWindow.loadURL('http://localhost:3000')
    // // mainWindow.webContents.openDevTools()
    // mainWindow.openDevTools()
    mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`)
    if(isDev){
        mainWindow.openDevTools()
        globalShortcut.register('CommandOrControl+Shift+I', () => {
            mainWindow.webContents.openDevTools()
        })
    }

    return mainWindow
}

// 程序单例模式
let myWindow = null
//此方法的返回值表示你的应用程序实例是否成功取得了锁。 如果它取得锁失败，你可以假设另一个应用实例已经取得了锁并且仍旧在运行，并立即退出。
const gotTheLock = app.requestSingleInstanceLock()
if(!gotTheLock){
    // 如果有同样的程序在运行，就退出
    app.quit()
}else{
    app.on('second-instance',(event, commandLine, workingDirectory, additionalData) => {
        // 有人试图运行第二个实例，我们应该关注我们的窗口
        if(myWindow){
            // 如果我们的窗口最小化，那么恢复它
            if (myWindow.isMinimized()) myWindow.restore()
            // 然后把它聚焦到我们的应用程序上
            myWindow.focus()
        }
    })
    app.whenReady().then(()=>{
        ipcMain.handle('dialog:openFile', handleOpen)
        myWindow = createWindow();
        app.on('activate', () => {
            // 在macOS上，当单击dock图标并且没有其他窗口打开时，
            // 通常在应用程序中重新创建一个窗口。
            if (BrowserWindow.getAllWindows().length === 0) {
                createWindow()
            }
        })
    })
}

// 当所有窗口关闭时退出。
app.on('window-all-closed', () => {
    // 在macOS上，除非用户用Cmd + Q显式退出，
    // 否则绝大部分应用及其菜单栏会保持激活。
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// 在当前文件中你可以引入所有的主进程代码
// 也可以拆分成几个文件，然后用 require 导入。
require('./ipcMain/readDir')
