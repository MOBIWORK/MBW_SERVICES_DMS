import {AuthProvider} from '@/auth'
import { useFrappeGetDocList } from 'frappe-react-sdk';
import Router from './routes/sections'
import { useEffect } from 'react'
import {Modal} from 'antd'
function App() {
  const [_,contextHolder] = Modal.useModal()
  const [messageApi,contextHolderMsg] = message.useMessage();
  const { data, error, isValidating, mutate } = useFrappeGetDocList("DMS Router")
  if(data) {
    console.log("data",data);
    
  }

  const warningMsg = (message: string) => {
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
    <AuthProvider>
      <Router />
      {contextHolder}
    </AuthProvider>
  )
}

export default App
