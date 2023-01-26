import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    //严格模式节点需要去点
    //会影响 useEffect得执行时机
    <App />

)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

