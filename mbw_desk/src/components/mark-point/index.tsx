import React from 'react'
import { PointMap } from "../../icons";

interface locationProps {
    des: any
}
export function MartLocation({des}:locationProps) {
  return (
    <div className= "relative">
        <span className='absolute whitespace-nowrap top-[-50%] bg-white block px-2 rounded-md -left-[50%] shadow-sm font-medium'>
            {des}
        </span>
      <PointMap/>
    </div>
  )
}
