import { faker } from "@faker-js/faker";

export const cardData = [

    {
        title: "Lượt viếng thăm",
        value: 66
    },
    {
        title: "Đơn hàng",
        value: 30
    },
    {
        title: "Sản phẩm",
        value: 100
    },
    {
        title: "Tỷ lệ chuyển đổi",
        value: "66%"
    },
    {
        title: "Nhân viên online",
        value: 66
    },
    {
        title: "Tổng số người mua",
        value: 60
    },
]

export const itemsProduct = [
    {
        image: "https://i.pinimg.com/236x/bd/c3/f3/bdc3f323464509d73a1b42f5071a78b2.jpg",
        ten_sp: "Dell Computer Monitor",
        doanh_so: " 73900000"
    },
    {
        image: "https://i.pinimg.com/236x/bd/c3/f3/bdc3f323464509d73a1b42f5071a78b2.jpg",
        ten_sp: "Dell Computer Monitor",
        doanh_so: " 73900000"
    },
    {
        image: "https://i.pinimg.com/236x/bd/c3/f3/bdc3f323464509d73a1b42f5071a78b2.jpg",
        ten_sp: "Dell Computer Monitor dáigduagfkausdfgaudsfgvauvfkauvduvasuydfvasdfugvasdfjagsdfasdjfhgasdfyha",
        doanh_so: " 73900000"
    },
    {
        image: "https://i.pinimg.com/236x/bd/c3/f3/bdc3f323464509d73a1b42f5071a78b2.jpg",
        ten_sp: "Dell Computer Monitor",
        doanh_so: " 73900000"
    },
    {
        image: "https://i.pinimg.com/236x/bd/c3/f3/bdc3f323464509d73a1b42f5071a78b2.jpg",
        ten_sp: "Dell Computer Monitor",
        doanh_so: " 73900000"
    }
]

export  const dataChart = [
    { "Giờ": '02', "Doanh số": 3 },
    { "Giờ": '04', "Doanh số": 4 },
    { "Giờ": '06', "Doanh số": 3.5 },
    { "Giờ": '08', "Doanh số": 5 },
    { "Giờ": '10', "Doanh số": 4.9 },
    { "Giờ": '12', "Doanh số": 6 },
    { "Giờ": '14', "Doanh số": 7 },
    { "Giờ": '16', "Doanh số": 9 },
    { "Giờ": '18', "Doanh số": 6 },
    { "Giờ": '20', "Doanh số": 30 },
    { "Giờ": '22', "Doanh số": 36 },
    { "Giờ": '24', "Doanh số": 90 },
  ];

const labels = (() => {
    let arr:string[] = []
    for(let i = 0;i<=24;i+=2) {
        if(i<10) arr.push(`0${i}`)
        else arr.push(`${i}`)
    }

    return arr
})()
export const dataChart2 = {
    labels: [...labels,"Giờ"],
    datasets: [{
      data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
      fill: false,
      borderColor: '#5BE49B',
      tension: 0.1
    }]
  };