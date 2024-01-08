import React from 'react'
import useCookie from '@/hooks';
import { Navigate ,redirect} from "react-router-dom";
type Props = {
    children: React.ReactNode;
  };
export function AuthProvider({children}:Props) {
    let isLogin = useCookie()
    // if(isLogin)
    //     return <>{children}</>
    // return <Navigate to={'/#login'} replace={true}/>
    return <>{children}</>

}