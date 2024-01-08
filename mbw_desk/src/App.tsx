import {AuthProvider} from '@/auth'
// import Router from './routes/sections'
import { useEffect } from 'react'
function App() {
  useEffect(()=>{
    (async() => {
    })()
  },[])
  return (
    <AuthProvider>
      Conment {window.csrf_token}
      {/* <Router /> */}
    </AuthProvider>
  )
}

export default App
