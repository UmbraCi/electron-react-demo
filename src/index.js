import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom'
import { globalRouters } from '@/router'

// import App from './App';
// import App from '@/pages/login';
// import App from '@/pages/home'
import { ConfigProvider } from 'antd'
// 引入Ant Design中文语言包
import zhCN from 'antd/locale/zh_CN'
// 全局样式
import '@/common/styles/frame.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      {/* <App /> */}
      <RouterProvider router={globalRouters}/>
    </ConfigProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
