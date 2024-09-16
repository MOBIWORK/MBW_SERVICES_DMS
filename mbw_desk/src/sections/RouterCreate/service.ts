"use strict";

import { AxiosService } from "@/services/server";

export const handleListGroup= async(key: string = "") => await AxiosService.get(
    "/api/method/frappe.desk.search.search_link",
    {
      params: {
        txt: "",
        doctype: "Customer Group",
        ignore_user_permissions: 0,
        reference_doctype: "Customer",
      },
    }
  );



  export const handleListTerritory = async(key:string = "") => await AxiosService.get(
    "/api/method/frappe.desk.search.search_link",
    {
      params: {
        txt: "",
        doctype: "Territory",
        ignore_user_permissions: 0,
        reference_doctype: "Customer",
      },
    }
  );

