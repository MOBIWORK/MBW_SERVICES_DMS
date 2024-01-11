type Options = {
    label: string,
    value: any
}

export const statusOption:Options[] = [
    {
    label: "Hoạt động",
    value: 'Active'
    },
    {
        label: "Khóa",
        value: 'Lock'
        },
]

export const addCustomerOption:Options[] = [
    {
        label: "Thêm khách hàng",
        value: 'add'
    },
    {
        label: "Chọn khách hàng",
        value: 1
    },
    {
        label: "Import khách hàng",
        value: 2
    }
]


export const  commonTable = [
    {
        title: "Stt",
        dataIndex: "stt",
        key: "stt",
        render: (_,record,index) => index +1
    },
    {
        title: "Mã khách hàng",
        dataIndex: "customer_id",
        key: "customerid"
    },
    {
        title: "Tên khách hàng",
        dataIndex: "customer_name",
        key: "customername"
    },

]

export const baseCustomers = [
    {
        customer_id: "431456",
        customer_name: "Chu Văn A",
        display_address: "CT1 Chung cư bộ công an",
        phone_number: "0123456789",
        frequency: "1;2;3;4;5",

    },
    {
        customer_id: "4314s56",
        customer_name: "Chu Văn A",
        display_address: "CT1 Chung cư bộ công an",
        phone_number: "0123456789",
        frequency: "",

    },
]

export const optionsFrequency = [
    {
        label: "1",
        value: "1"
    },
    {
        label: "2",
        value: "2"
    },
    {
        label: "3",
        value: "3"
    },
    {
        label: "4",
        value: "4"
    },
    {
        label: "5",
        value: "5"
    },
]