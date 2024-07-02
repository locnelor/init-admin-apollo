import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ApolloWrapper } from './lib/apollo-provider.tsx'
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloWrapper>
      <ConfigProvider locale={zhCN}>
        <App />
      </ConfigProvider>
    </ApolloWrapper>
  </React.StrictMode>,
)
