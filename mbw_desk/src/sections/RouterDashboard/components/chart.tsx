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

export const options = {
  responsive: true,
  plugins: {
    legend: false,
    title: false
  },
};

export const ChartCustom = ({data}: {data:any}) => {

    return <WrapperCard >
        <p className="text-lg font-bold ">Biểu đồ  doanh số</p>
        <div className='mt-12'><Line options={options} data={data} /></div>       
    </WrapperCard>
}