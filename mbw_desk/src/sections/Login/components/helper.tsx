import { useTranslation } from "react-i18next"

export const text = (loading:boolean,errorLogin:boolean,type:string) => {
    const {t} = useTranslation()
    if(loading){
        return t('Loading...')
    }
    else if(errorLogin) {
        switch(type) {
            case "login" :
                return t("error_login")
            case "login_email" :
            case "forgot":
                return t("error_form_login")
        }
    }
    else {
        switch(type) {
            case "login" :
                return t("Login")
            case "login_email" :
                return t("login_email")
            case "forgot":
                return t("forgot_btn")
        }
    }
}

export const titleText = (type:string) => {
    const {t} = useTranslation()
    switch(type) {
        case "login" :
            return t("Login_to_erpn")
        case "login_email" :
            return t("Login_to_erpn_email")
        case "forgot":
            return t("Login_to_erpn_forgot")
    }
}