import { Tag } from 'antd'
import classNames from 'classnames'
import React, { ReactNode } from 'react'
import styled from 'styled-components'

export const TagCustom = styled(Tag)`
border-radius: 30px;
color: #1877F2;
font-size: 14px;
line-height: 36px;
`


interface tagProps {
    children : ReactNode | string | null,
    type?: "Success" | "Warning"
}
export const TagCustomStatus = ({children,type="Success"}:tagProps) => {
    return <div className={classNames('whitespace-nowrap px-[4px] py-[8px] flex justify-center items-center text-[14px] leading-[21px]',type == "Success" ? "bg-[#22c55e14] text-[#22C55E]" : "bg-[#ff563014] text-[#FF5630]")}>
        •{children}
    </div>
}

interface tagopProps {
    children : ReactNode | string | null,
    type?: "Open" | "Close"
}
export const TagCustomOpen = ({children,type="Open"}:tagopProps) => {
    return <div className={classNames('whitespace-nowrap px-2 rounded py-[8px] flex justify-center items-center text-[14px] leading-[21px]',type == "Open" ? "bg-[#22c55e14] text-[#22C55E]" : "bg-[#919eab14] text-[#919EAB]")}>
        {children}
    </div>
}

