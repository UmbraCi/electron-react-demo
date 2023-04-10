const { app, BrowserWindow, dialog, ipcMain } = require('electron')
const path = require('path')


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
        }
    })

    // 并且为你的应用加载index.html
    mainWindow.loadURL('http://localhost:3000')
    // mainWindow.webContents.openDevTools()
    mainWindow.openDevTools()
}

app.whenReady().then(()=>{
    ipcMain.handle('dialog:openFile', handleOpen)
    createWindow();
    app.on('activate', () => {
        // 在macOS上，当单击dock图标并且没有其他窗口打开时，
        // 通常在应用程序中重新创建一个窗口。
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

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
