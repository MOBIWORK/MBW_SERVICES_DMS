import {AuthProvider} from '@/auth'
import { useFrappeGetDocList } from 'frappe-react-sdk';
import Router from './routes/sections'
import { useEffect } from 'react'
function App() {
  const { data, error, isValidating, mutate } = useFrappeGetDocList("DMS Router")
  if(data) {
    console.log("data",data);
    
  }
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  )
}

export default App
