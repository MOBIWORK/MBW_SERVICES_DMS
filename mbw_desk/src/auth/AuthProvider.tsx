import React from "react";
import { useFrappeAuth } from "frappe-react-sdk";
import { BASE_URL } from "../routes/path";
type Props = {
  children: React.ReactNode;
};
export function AuthProvider({ children }: Props) {
  const { currentUser, isLoading } = useFrappeAuth();
  // console.log(window.location.pathname);

  if (process.env.NODE_ENV === "production") {
    if (
      !isLoading &&
      !currentUser &&
      window.location.pathname != `${BASE_URL || ""}/auth/login`
    )
      window.location.href = `${BASE_URL || ""}/auth/login`;
    else if (
      currentUser &&
      window.location.pathname == `${BASE_URL || ""}/auth/login`
    ) {
      window.location.href = `/app`;
    }
  }
  return <>{children}</>;
}