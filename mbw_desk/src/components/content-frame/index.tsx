

import React, { ReactNode } from 'react'

interface Props {
    header: ReactNode,
    children: ReactNode
}

function ContentFrame({header,children}: Props) {

    return (
        <div className='max-h-screen flex flex-col'>
        <div className='w-full bg-white'>
            {header}
        </div>
        <div className='w-full p-5 flex-1 max-h-[calc(100vh-80px)] bg-[#f9fafa] '>
            {children}
        </div>
        </div>
    )
}

export default ContentFrame
