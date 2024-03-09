import { Avatar, List } from "antd"
import { WrapperCard } from "./card"


export const ListCustom = ({ data }: { data: any }) => {


    return <WrapperCard>
        <p className="text-lg font-bold ">Top 5 sản phẩm có doanh số cao nhất</p>
        <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item:any, index) => (
                <List.Item>
                    <div className="mr-4">{index+1}</div>
                    <div className="flex-1">
                        <Avatar shape="square" size={48}  src={item.image} />
                        <span className="mx-4 text-base font-medium">{item.name}</span>
                    </div>
                    <div className="text-sm inline-flex items-center">
                        {Intl.NumberFormat().format(item.price)} <span className="text-xs text-[#637381] ml-1">đ</span>
                    </div>
                </List.Item>
            )}
        />
    </WrapperCard>
}