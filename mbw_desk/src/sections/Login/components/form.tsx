import { Button, Form, Input, Select } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FormItemCustom } from '../../../components'
import { GoogleOutlined, LockOutlined } from '@ant-design/icons'
import { AxiosService } from '../../../services/server'
import { useNavigate } from 'react-router-dom'
import i18n from '../../../i18n'
import { InputLogin, InputLoginPw, SelectLanguage } from './styled'
import { EnglandFlag, LockIcon, MailIcon, VietNameFlag } from './icon'
import { text, titleText } from './helper'
import { modalMessage, successToast } from '../../../util'

interface Props { }

function FormLogin(props: Props) {
    const [errorLogin,setErrorLogin] = useState<boolean>(false)
    const [loading,setLoading] = useState<boolean>(false)
    const [formLoad,setFormLoad] = useState<"login" | "login_email" | "forgot">("login")
    const { } = props
    const {t} = useTranslation()
    const navigate = useNavigate()
    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };
    const onSubmit = useCallback(async(value:any) => {
        try{
            setLoading(true)
            let navigate,cmd,link
            switch (formLoad) {
                case "login":
                    navigate = '/app'
                    cmd="login"
                    link="/login"
                    break;
                case "forgot":
                    navigate = false
                    cmd = "frappe.core.doctype.user.user.reset_password"
                    link='/'
                    break;
                case "login_email":
                    navigate = false
                    cmd = "frappe.www.login.send_login_link"
                    link='/'
                    break;
                default:
                    break;
            }
            console.log(formLoad);
            
          let rs = await AxiosService.post(link,{
            ...value,
            cmd
           })
           if(navigate) {
               window.location = navigate
           }
           else {
            console.log(rs);
            let title = JSON.parse(rs._server_messages)?.['title'] ;
            let message = JSON.parse(rs._server_messages)?.['message'] ;
            modalMessage(title as string,message as string)
           }
        }catch(err) {
            console.log("loi form",err);
            
            setErrorLogin(true)      
        }
        finally {
            setLoading(false)
        }
    },[formLoad])
    useEffect(() => {
        setErrorLogin(false)
    },[formLoad])
    return (
        <div className="w-[465px] mx-auto bg-white p-[30px] rounded-[18px] shadow-sm">
            <SelectLanguage
                options={[
                    { value: 'vi', label: <div className="flex items-center"> <VietNameFlag/>{" "} <span className='ml-1'>Tiếng Việt</span> </div>},
                    { value: 'en', label: <div className="flex items-center"><EnglandFlag/>{" "} <span className='ml-1'>English</span> </div>}, 
                ]}
                defaultValue={localStorage.getItem("i18nextLng") && localStorage.getItem("i18nextLng") =="vi-VN" ? "vi" : localStorage.getItem("i18nextLng")}
                onChange={(value:string) => {changeLanguage(value)}}
            />

                <h2 className='font-semibold text-xl text-[#383838] mt-3'>{titleText(formLoad)}</h2>
                <Form onFinish={onSubmit} className='mt-10'>
                    <FormItemCustom name={"usr"} required className='!mb-5' validateStatus={errorLogin && 'error'}>
                        <InputLogin size="large" placeholder={t("email/username")} prefix={<MailIcon />} />
                    </FormItemCustom>

                    {formLoad == "login" && <>
                        <FormItemCustom name='pwd' required validateStatus={errorLogin && 'error'}>
                            <InputLoginPw size="large" placeholder={t("•••••")}  prefix={<LockIcon />} />
                        </FormItemCustom>
                        <p  onClick={setFormLoad.bind(null,"forgot")}  className='cursor-pointer text-right my-5 text-sm text-[#171717]'>{t("forgot")}</p>
                    </>}
                    <Button htmlType="submit" className='w-full bg-[#C4161C] px-4 font-bold text-[15px] !text-[#FFFFFF] !h-fit leading-[26px] !border-none'>
                        {text(loading,errorLogin,formLoad)}
                    </Button>
                </Form>
                {/* dang nhap gmail */}
                {
                    formLoad == "login" && 
               <>
                    <p className='my-5 text-center font-normal'>{t("or")}</p>
                    <Button onClick={setFormLoad.bind(null,"login_email")} className='w-full bg-[#F3F3F3] hover:bg-[#d9d9d9] px-4 font-semibold text-[15px] !text-[#222222] !h-fit leading-[26px] !border-[#d9d9d9] '>
                            {t("LoginEmail")}
                        </Button>
               </>
                }

                {
                    formLoad !== "login" && <>
                    <Button onClick={setFormLoad.bind(null,"login")} className='w-full bg-transparent hover:bg-transparent px-4 font-semibold text-[15px] !text-[#222222] !h-fit leading-[26px] !border-none mt-2'>
                            {t("back_login")}
                        </Button>
                    </>
                }
        </div>
    )
}

export default FormLogin
