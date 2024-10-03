import { createSlice } from "@reduxjs/toolkit";

const groupInitialState = {
    sales_team: undefined, //nhóm bán hàng
    employee: undefined, // nhân viên
    customer_type: undefined, // loại khách hàng
    customer_group: undefined, // nhóm khách hàng
    territory : undefined, // khu vực
    company: undefined, // coong ty
    customer: undefined, // Khach hang
    warehouse: undefined, // kho
    has_sales_order: undefined, //phat sinh don hang
    brand: undefined, // nhan hieu
    industry: undefined, // nganh hang
    supplier: undefined, //nha cung cap
}

const groupSlice = createSlice({
    name: "group",
    initialState: groupInitialState,
    reducers: {
        setSaleTeam: (state, action) => {
            state.sales_team = action.payload 
        },
        setEmployee: (state, action) => {
            state.employee = action.payload || undefined
        },
        setCustomerType: (state, action) => {
            state.customer_type = action.payload 
        },
        setCustomerGroup: (state, action) => {
            state.customer_group = action.payload 
        },
        setTerritory: (state, action) => {
            state.territory = action.payload 
        },
         setCompany: (state, action) => {
            state.company = action.payload 
        },
         setCustomer: (state, action) => {
            state.customer = action.payload 
        },
        setWarehouse: (state, action) => {
            state.warehouse = action.payload 
        },
        setHasSaleOrder: (state, action) => {
             state.has_sales_order = action.payload
        },
        setBrand: (state, action) => {
             state.brand = action.payload
        },
        setIndustry: (state, action) => {
             state.industry = action.payload
        },
        setSupplier: (state, action) => {
             state.supplier = action.payload
        }
    }
})


export const {
    setWarehouse,
    setSupplier,
    setBrand,
    setHasSaleOrder,
    setTerritory,
    setCustomerGroup,
    setCustomerType,
    setCompany ,
    setCustomer,
    setEmployee,
    setSaleTeam,
    setIndustry } = groupSlice.actions;
    

export default groupSlice.reducer;
