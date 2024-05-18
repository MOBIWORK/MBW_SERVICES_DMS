

import React, { ReactNode } from 'react'

interface Props {
    header: ReactNode,
    children: ReactNode
}

function ContentFrame({header,children}: Props) {

    return (
        <>
        <div className='w-full bg-white'>
            {header}
        </div>
        <div className='w-full p-5'>
            {children}
        </div>
        </>
    )
}

export default ContentFrame
