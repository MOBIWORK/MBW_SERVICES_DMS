import { Row } from "antd";
import styled from "styled-components";


import React from 'react'

type Props = {
    children: React.ReactNode,
    className?: string
}
export default function RowCustom({children,className}:Props) {
  return (
    <Row gutter={32} className={"mt-3 "+ className}>{children}</Row>
  )
}
