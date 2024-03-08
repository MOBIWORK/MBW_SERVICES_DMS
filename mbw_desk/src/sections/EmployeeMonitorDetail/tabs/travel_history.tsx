import React from 'react'
import { Helmet } from 'react-helmet-async'
import { DatePick } from '../../../components/date-picker/date-picker'

export default function TravelHistory() {
  return (
    <>
     <Helmet>
      <script>
        {
          `
          var options = {
                  container: 'travel', //id div chứa map
                  projectId: '6556e471178a1db24ac1a711',
                  objectId: '655824e13a62d46bf149dced',
                  from_time: '2024-02-28T07:00:00',
                  to_time: '2024-02-29T08:00:00',
                  pageNumber: 1,
                  pageSize: 1000,
                  apiKey: 'w1Dlh2wRon7mE6sL196TgvLS45fw02uon74pJ0rc',
              };
              var map = new ekmapplf_tracking.locationHistory(options);
      `
        }
        </script>
     </Helmet>
     <div className='border border-solid border-[#F5F5F5] rounded-lg'>
      <div className='p-4 border border-solid border-transparent border-b-[#F5F5F5]'>
        <DatePick />
      </div>
     <div id = "travel" className='h-[70vh] relative'>

     </div>

     </div>
    </>
  )
}
