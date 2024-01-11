import React from 'react'
import Header from './header'


type Props = {
    children: React.ReactNode
}
export default function DashboardLayout({children}:Props) {
  return (
    <div className='bg-[#F5F7FA] w-screen h-screen'>
    <Header/>
    <div className='max-w-full w-[80%] mx-auto'><div  className="rounded-md">{children}</div></div>
    </div>
  )
}
