import {AuthProvider} from '@/auth'
import { useFrappeGetDocList } from 'frappe-react-sdk';
import Router from './routes/sections'
import { createContext, useEffect } from 'react'
import {Modal,message} from 'antd'

export const GlobalContext = createContext<any>(null)
function App() {
  const [_,contextHolder] = Modal.useModal()
  const [messageApi,contextHolderMsg] = message.useMessage();
  const { data, error, isValidating, mutate } = useFrappeGetDocList("DMS Router")
  if(data) {
    console.log("data",data);
    
  }

  const warningMsg = (message: string="warning") => {
    messageApi.open({
      type: 'warning',
      content: message,
    });
  };
  const errorMsg = (message : string = "error") => {
    messageApi.open({
      type: 'error',
      content: message,
    });
  };

  const successMsg = (message : string = "Success") => {
    messageApi.open({
      type: 'success',
      content: message,
    });
  };
  return (
    <Router />
    // <AuthProvider>
    //  <GlobalContext.Provider value={{warningMsg,errorMsg,successMsg}}>
        
    //     {contextHolder}
    //     {contextHolderMsg}
    //  </GlobalContext.Provider>
    // </AuthProvider>
  )
}

export default App
