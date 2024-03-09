import classNames from "classnames";
import { ReactNode } from "react";
import { Upicon } from "./icons";


export const WrapperCard = ({children,type="card"}: {children: ReactNode | string,type?: "map" | "card"}) => {
    return <div className={classNames("border border-solid border-[#DFE3E8] rounded-2xl overflow-hidden max-h-485px",type=="card" && "p-6")}>
    {children}
    </div>
}


export const Doanhso =({data}: {data:any}) => {
    return <WrapperCard>
         <div className="text-center">
            <p className="text-base font-medium">
                Doanh số hôm nay
            </p>
            <div className="text-[15px] text-[#637381] flex items-center justify-center py-4"><Upicon/> {`+89,4%`} vs hôm qua</div>
            <div className="text-[#22C55E] text-4xl font-medium flex items-center justify-center py-4">{
                new Intl.NumberFormat().format(1000000000)
            } <span className="text-xl">đ</span></div>
        </div>
    </WrapperCard>
}

export const InfoCard =({data}: {data:any}) => {

    return <WrapperCard>
        <p className="text-sm font-medium">{data.title}</p>
        <div className="text-xl font-medium">{data.value}</div>
    </WrapperCard>
}