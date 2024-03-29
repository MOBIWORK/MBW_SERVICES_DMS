import classNames from "classnames";
import { ReactNode } from "react";
import { Downicon, Upicon } from "./icons";


export const WrapperCard = ({children,type="card"}: {children: ReactNode | string,type?: "map" | "card"}) => {
    return <div className={classNames("bg-white border border-solid border-[#DFE3E8] rounded-2xl overflow-hidden ",type=="card" && "p-6")}>
    {children}
    </div>
}


export const Doanhso =({data}: {data:any}) => {
    return <WrapperCard>
         <div className="text-center bg-white">
            <p className="text-base font-medium">
                Doanh số hôm nay
            </p>
            <div className="text-[15px] text-[#637381] flex items-center justify-center py-4">{data.phan_tram > 0 ? <><Upicon/> {`+${data.phan_tram}%`}</> : <><Downicon/> {`${data.phan_tram}%`}</>}  vs hôm qua</div>
            <div className="text-[#22C55E] text-4xl font-medium flex items-center justify-center py-4">{
                new Intl.NumberFormat().format(data.doanh_so)
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