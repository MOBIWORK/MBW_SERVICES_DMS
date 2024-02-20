import React from 'react'
import { PointMap } from "../../icons";

interface locationProps {
    des: any
}
export function MartLocation({des}:locationProps) {
  return (
    <div className= "relative">
        <span className='absolute whitespace-nowrap top-[-50%]'>
            {des}
        </span>
      <PointMap/>
    </div>
  )
}
