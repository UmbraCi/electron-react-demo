import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { goto } from '@/api'
import './home.less'
import { useState } from 'react'



const { ipcRenderer } = window.electron


function Home() {
    const navigate = useNavigate()

    const [filePath, setFilePath ] = useState('');

    const openFile = async ()=>{
        const _filePath = await window.electronAPI.openFile()
        setFilePath(_filePath)
    }

    const readDir = async ()=>{
        ipcRenderer.send('readDir',{msg:'test'})
        window.api.readDirReply((event,result)=>{
            if(result.canceled){
                console.log('取消')
                return
            }else{
                console.log(result)
            }
        })
    }

    return (
        <div className="P-home">
            <h1>Home Page</h1>
            <div className="ipt-con">
                   <Button onClick={openFile}>打开文件</Button>
                   <span>{filePath}</span>
            </div>
            <div className="ipt-con">
                   <Button onClick={readDir}>读取目标目录</Button>
                   <span>{filePath}</span>
            </div>
            <div className="ipt-con">
                   <Button onClick={()=>{goto('/login')}}>组件外跳转</Button>
            </div>
            <div className="ipt-con">
                <Button onClick={()=>{navigate('/login')}}>返回登录</Button>
            </div>
        </div>
    )
}
export default Home