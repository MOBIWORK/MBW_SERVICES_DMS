// import { Line } from "@ant-design/charts";
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import { WrapperCard } from './card';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const labels = (() => {
  let arr: string[] = []
  for (let i = 0; i <= 24; i += 2) {
    if (i < 10) arr.push(`0${i}`)
    else arr.push(`${i}`)
  }

  return arr
})()
export const dataChart2 = {
  labels: [...labels, "Giờ"],
  datasets: [{
    data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
    fill: false,
    borderColor: '#5BE49B',
    tension: 0.1
  }]
};

export const options = {
  responsive: true,
  plugins: {
    legend: false,
    title: false
  },
};

export const ChartCustom = ({ data }: { data: any[] }) => {  
  const dataChart = {
    labels:[...data.length > 0 ? data.map(dt => dt.thoi_gian) : labels ,"Giờ"],
    datasets: [{
      data: data.map(dt => dt.doanh_so),
      fill: false,
      borderColor: '#5BE49B',
      tension: 0.1
    }]
  }
  return <WrapperCard >
   <div className='h-[415px]'>
      <p className="text-lg font-bold ">Biểu đồ  doanh số</p>
      <div className='mt-12'><Line options={options} data={dataChart} /></div>
   </div>
  </WrapperCard>
}