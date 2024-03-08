import React from 'react'
import { dataCustomer } from '../data'
import CustomerCard from '../components/CustomerCard'

export default function NotTravel() {
  return (
    <div>      
      {dataCustomer.map((customer, index) => <CustomerCard customer={customer} key={index} keyCard={index + 1} mode="nonCheckin" />)}
    </div>
  )
}
