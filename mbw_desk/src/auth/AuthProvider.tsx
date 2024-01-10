import React, { useEffect, useState } from 'react'
import { useFrappeAuth } from 'frappe-react-sdk';
import { Navigate ,redirect} from "react-router-dom";
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
    // if(!isLoading && !currentUser)
    //   window.location.href = '/#login'
    return <>{children}</>

}