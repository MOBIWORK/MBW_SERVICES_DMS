import React, { useCallback, useContext } from 'react'
import { CustomerContext } from '../view'
import { GlobalContext } from '@/App'
import { AxiosService } from '@/services/server'
import { rsData } from '@/types/response'
import { Button } from 'antd'
import { ThunderIcon } from '@/icons'
import { CustomerType } from '../type'

function Optimize() {
  const { setCustomerRouter,customerRouter} = useContext(CustomerContext)
  const { successMsg, errorMsg } = useContext(GlobalContext)
  const optimalRouter = useCallback(async () => {
    //tách mảng người dùng thành 2 mảng con:có vị trí/ không vị trí
    const customerLoactions = customerRouter.filter((customer: CustomerType) => customer.long && customer.lat)
    const customerNoLoactions = customerRouter.filter((customer: CustomerType) => !(customer.long && customer.lat))
    console.log({
      customerLoactions,
      customerNoLoactions
    });
    
    // chuyển mảng người dùng thành mảng vị trí
    const locations = customerLoactions.map((customer: CustomerType, index: number) => ({
      "id": index,
      "customer": customer.customer_code,
      "long":Number.parseFloat(customer.long as any),
      "lat": Number.parseFloat(customer.lat as any)
    }))

    // tối ưu mảng vị trí
    try {
      const rsOptimal: rsData<any[]> = await AxiosService.post("/api/method/mbw_dms.api.helpers.optimal_router.optimal_router", {
        locations
      })
      // mảng vị trí khách hàng trả về
      const locationsOptimal = rsOptimal.result
      // chuyển mảng người dùng
      const newCustomersLocation = locationsOptimal.map((csLocation) => {
        let customerDetail = customerLoactions.find((customer: CustomerType) => customer.customer_code == csLocation.customer)
        return customerDetail
      })
      
      setCustomerRouter([...newCustomersLocation, ...customerNoLoactions])
      successMsg()
    } catch (err: any) {
      errorMsg(err?.response?.data?.message || "Something was wrong")
    }

    // cập nhật lại mảng khách hàng chung

  }, [customerRouter])

  return (
    <Button
      className="w-full flex items-center text-[#1677ff] bg-[#1877f214] h-[36px]"
      icon={<ThunderIcon />}
      onClick={optimalRouter}
    >
      Tối ưu tuyến
    </Button>
  )
}

export default Optimize
