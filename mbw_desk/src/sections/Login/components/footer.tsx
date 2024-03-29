import React from 'react'
import Content from './content'
import logo from '@/assets/LogoMBW.png'
import { Col, Row } from 'antd'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
interface Props {}

function Footer(props: Props) {
    const {} = props
    const {t} = useTranslation()
    return (
        <Content>
            <div className='w-full px-[9px]'>
                <Row className='w-full px-[15px]'>
                    <img src={logo} className='w-[80px] h-[38px] object-contain'/>
                </Row>
                <Row className='w-full justify-between py-[16px] px-[15px]'>
                    <Col className="text-base">
                        Powered by MBW
                    </Col>
                    <Col >
                    <Row gutter={8} className="text-sm font-medium text-[#525252]">
                        <Col><Link to="" className='!text-[#525252]'>{t("Chinh_sach")}</Link></Col>
                        <Col><Link to="" className='!text-[#525252]'>{t("Dieu_khoan")}</Link></Col>
                        <Col><Link to="" className='!text-[#525252]'>{t("Lien_he")}</Link></Col>
                    </Row>
                    </Col>
                </Row>
            </div>
        </Content>
    )
}

export default Footer
