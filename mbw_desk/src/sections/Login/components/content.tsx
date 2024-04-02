import classNames from 'classnames'
import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode,
    bg?: boolean,
    pd?: boolean,
    classN ?: string
}

function Content({children,bg,pd,classN} : Props) {

    return (
        <div className={classNames('w-full',bg && `bg-[white]`,classN)}>
            <div className={classNames("w-[1290px] mx-auto max-w-full flex flex-row justify-between items-center h-full",pd && "px-[24px]")}>{children} </div>
        </div>
    )
}

export default Content