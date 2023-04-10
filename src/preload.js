const { contextBridge,ipcRenderer } = require('electron')

// 通过contextBridge暴露给渲染进程
contextBridge.exposeInMainWorld('electron',{
    ipcRenderer
})

contextBridge.exposeInMainWorld('api',{
    readDirReply:(callback)=>{
        ipcRenderer.once('readDir-reply',(event,result)=>{
            callback(event,result)
        })
    }
})



contextBridge.exposeInMainWorld('electronAPI',{
    openFile:()=> ipcRenderer.invoke('dialog:openFile')
})