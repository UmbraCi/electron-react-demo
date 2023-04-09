import { ipcMain,dialog } from 'electron'
import fs from 'fs'
import path from 'path'

// 打开选择目录对话框并遍历目录里面的所有文件
ipcMain.on('readDir', (event, arg)=> {
    console.log('接收到的渲染进程传参:',arg)
    // dialog.showOpenDialog({}).then()
})