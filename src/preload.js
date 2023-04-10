const { contextBridge,ipcRenderer } = require('electron')

// 通过contextBridge暴露给渲染进程
contextBridge.exposeInMainWorld('electron',{
    ipcRenderer
})

// contextBridge.exposeInIsolatedWorld('api',)
contextBridge.exposeInMainWorld('electronAPI',{
    openFile:()=> ipcRenderer.invoke('dialog:openFile')
})