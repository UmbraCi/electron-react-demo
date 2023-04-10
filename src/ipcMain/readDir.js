const { ipcMain, dialog } = require('electron')
const fs = require('fs')
const path = require('path')

// 打开选择目录对话框并遍历目录里面的所有文件
ipcMain.on('readDir', (event, arg)=> {
    console.log('接收到的渲染进程传参:',arg)
    dialog.showOpenDialog({
        // 只允许选择文件夹
        properties:['openDirectory']
    }).then(result=>{
        if(!result.canceled){
            result.fileList = loadFilesInDir(result.filePaths[0])
        }
        console.log(result)
        event.reply('readDir-reply',result)
    })
})


// 递归遍历目录
function loadFilesInDir(dir){
    let fileList = []
    let files = fs.readdirSync(dir)
    for (let i = 0; i < files.length; i++) {
        const filePath = path.join(dir,files[i]);
        // 获取信息
        let fileData = fs.statSync(filePath)
        // 判断是否是文件夹
        if(fileData.isDirectory()){
            fileList = fileList.concat(loadFilesInDir(filePath))
        }else{
            fileList.push(filePath)
        }
    }
    return fileList
}