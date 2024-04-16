import {AuthProvider} from '@/auth'
import { useFrappeGetDocList } from 'frappe-react-sdk';
import Router from './routes/sections'
import { useEffect } from 'react'
import {Modal} from 'antd'
function App() {
  const [_,contextHolder] = Modal.useModal()
  const { data, error, isValidating, mutate } = useFrappeGetDocList("DMS Router")
  if(data) {
    console.log("data",data);
    
  }
  return (
    <AuthProvider>
      <Router />
      {contextHolder}
    </AuthProvider>
  )
}

export default App
