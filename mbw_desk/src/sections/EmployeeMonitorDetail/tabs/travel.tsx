import CustomerCard from "../components/CustomerCard";
import { dataCustomer } from "../data";

export default function Travel() {
  return (
    <div>
      {dataCustomer.map((customer,index) => <CustomerCard customer={customer} key={index} keyCard={index +1 } mode="Checkin"/>)}
    </div>
  )
}
