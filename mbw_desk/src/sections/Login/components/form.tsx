import { Button, Form, Input, Select } from 'antd'
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FormItemCustom } from '../../../components'
import { GoogleOutlined, LockOutlined } from '@ant-design/icons'
import { AxiosService } from '../../../services/server'
import { useNavigate } from 'react-router-dom'
import i18n from '../../../i18n'
import { InputLogin, InputLoginPw, SelectLanguage } from './styled'
import { EnglandFlag, LockIcon, MailIcon, VietNameFlag } from './icon'

interface Props { }

function FormLogin(props: Props) {
    const [errorLogin,setErrorLogin] = useState<boolean>(false)
    const [loading,setLoading] = useState<boolean>(false)
    const { } = props
    const {t} = useTranslation()
    const navigate = useNavigate()
    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };
    const onSubmit = useCallback(async(value:any) => {
        try{
            setLoading(true)
           await AxiosService.post('/login',{
            ...value,
            cmd: "login"
           })
           window.location = '/app'
        }catch(err) {
            setErrorLogin(true)
            console.error(err);            
        }
        finally {
            setLoading(false)
        }
    },[])
    return (
        <div className="w-[465px] mx-auto bg-white p-[30px] rounded-[18px] shadow-sm">
            <SelectLanguage
                options={[
                    { value: 'vi', label: <div className="flex items-center"> <VietNameFlag/>{" "} <span className='ml-1'>Tiếng Việt</span> </div>},
                    { value: 'en', label: <div className="flex items-center"><EnglandFlag/>{" "} <span className='ml-1'>English</span> </div>}, 
                ]}
                defaultValue={localStorage.getItem("i18nextLng") || "vi"}
                onChange={(value:string) => {changeLanguage(value)}}
            />

                <h2 className='font-semibold text-xl text-[#383838] mt-3'>{t("Login_to_erpn")}</h2>
                <Form onFinish={onSubmit} className='mt-10'>
                    <FormItemCustom name={"usr"} required className='!mb-5' validateStatus={errorLogin && 'error'}>
                        <InputLogin size="large" placeholder={t("email/username")} prefix={<MailIcon />} />
                    </FormItemCustom>

                    <FormItemCustom name='pwd' required validateStatus={errorLogin && 'error'}>
                        <InputLoginPw size="large" placeholder={t("•••••")}  prefix={<LockIcon />} />
                    </FormItemCustom>
                    <p className='text-right my-5 text-sm text-[#171717]'>{t("forgot")}</p>
                    <Button htmlType="submit" className='w-full bg-[#C4161C] px-4 font-bold text-[15px] !text-[#FFFFFF] !h-fit leading-[26px] !border-none'>
                        {loading ? t('Loading...') : !errorLogin ? t("Login") : t("error_login")}
                    </Button>
                </Form>

                <p className='my-5 text-center font-normal'>{t("or")}</p>
                <Button className='w-full bg-[#F3F3F3] hover:bg-[#d9d9d9] px-4 font-semibold text-[15px] !text-[#222222] !h-fit leading-[26px] !border-[#d9d9d9] '>
                        {t("LoginEmail")}
                    </Button>
        </div>
    )
}

export default FormLogin
