import React, { useEffect, useState } from 'react'
import { useFrappeAuth } from 'frappe-react-sdk';
import { Navigate ,redirect} from "react-router-dom";
import { BASE_URL } from '../routes/path';
type Props = {
    children: React.ReactNode;
  };
export function AuthProvider({children}:Props) {
  const {
    currentUser,
    isValidating,
    isLoading,
    login,
    logout,
    error,
    updateCurrentUser,
    getUserCookie,
  } = useFrappeAuth();
  // console.log(window.location.pathname);
  
    if(!isLoading && !currentUser && window.location.pathname != `${BASE_URL || ""}/auth/login` )
      window.location.href = `${BASE_URL||""}/auth/login`
    else if(currentUser && window.location.pathname == `${BASE_URL || ""}/auth/login`) {
      window.location.href = `/app`
    }
    return <>{children}</>

}