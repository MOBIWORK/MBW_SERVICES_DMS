import { ClockCircleOutlined, EnvironmentOutlined, PictureOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { TagCustomOpen } from '../../../components'
import { Modal } from 'antd'
import { useState } from 'react'
import ModalDetail from './modal'


interface cardProps {
customer: any,
keyCard?: number,
mode : "Checkin" | "nonCheckin"
}
export default function CustomerCard({customer,keyCard,mode="Checkin"}:cardProps) {
  const [modalImage,setModalImage] = useState<{
    isOpen: boolean,
    data: any | null
  }>({
    isOpen: false,
    data: null
  })
  return (
    <>
      <div className='relative p-4 border border-[#DFE3E8] border-solid'>
          {mode == "Checkin" &&<div className='absolute top-8 right-2 w-fit '><TagCustomOpen>Mở cửa</TagCustomOpen></div>}
        <h2 className='text-base font-medium max-w-[286px]'>{keyCard}. {customer.customer_name}</h2>
        <div > <EnvironmentOutlined /><span className='text-base font-normal whitespace-normal ml-2'>{customer.customer_primary_address}</span></div>
        {mode == "Checkin" && <>
        <div> <ClockCircleOutlined /><span className='text-base font-normal whitespace-normal ml-2'>7:00 - 7:15 (15 phút)</span></div> 
        <div> <PictureOutlined /><span onClick={setModalImage.bind(null,{isOpen:true,data:[]})} className='text-base font-normal whitespace-normal text-[#1877F2] underline underline-offset-1 ml-2 cursor-pointer'>Xem hình ảnh</span></div> 
        <div> <ShoppingCartOutlined /><span className='text-base font-normal whitespace-normal text-[#1877F2] underline underline-offset-1 ml-2 cursor-pointer'>Xem đơn hàng</span></div> 
        </>}
      </div>
      <Modal width={1000} className='h-[804px]' open={modalImage.isOpen} onCancel={setModalImage.bind(null,{isOpen: false,data:null})} footer={false}>        
            <ModalDetail data={modalImage.data} />
      </Modal>
    </>
  )
}
