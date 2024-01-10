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