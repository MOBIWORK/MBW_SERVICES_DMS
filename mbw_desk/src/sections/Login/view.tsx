import React from 'react'
import Header from './components/header'
import Footer from './components/footer'
import image from '../../assets/illus.png'
import FormLogin from './components/form'
import { Col, Row } from 'antd'
import Content from './components/content'

interface Props { }

function LoginView(props: Props) {
    const { } = props

    return (
        <div className="bg-[#F4F6F8] h-screen flex flex-col">
            <Header />
            <div className="flex-1">
               <Content classN="h-full items-center">
                    <Row className='w-full h-full items-center'>
                        <Col className="gutter-row text-center hidden lg:block " span={24} lg={12}>
                            <img className='w-[543.6px] h-[563.51px] object-contain' src={image} />
                        </Col>
                        <Col  className="gutter-row" span={24}  lg={12}><FormLogin /></Col>
    
                    </Row>
               </Content>
            </div>
            <Footer />
        </div>
    )
}

export default LoginView
