import './SupervisoryStaff.css';

interface DataMovingTimeLine{
    time_moving: string;
    total_distance: string;
    total_time: string;
    index_item: number;
}

export function  ItemMovingTimeLineDot(){
    return <>
        <div style={{height:'36px', width:'36px', borderRadius:'32px', border:'1px solid #DFE3E8', gap:'8px'}} className="flex items-center justify-center">
            <div style={{width: '20px', height: '20px', backgroundSize: 'Cover'}} className='icon_distance'></div>
        </div>
    </>
}

export function ItemMovingTimeLineContent({ data, onEventClickItem }: { data: DataMovingTimeLine, onEventClickItem: any }){
    const handldeClickItem = () => {
        onEventClickItem(data.index_item);
    }

    return <>
        <div className="flex items-center" style={{cursor: "pointer"}} onClick={handldeClickItem}>
            <div style={{color: '#212B36', fontWeight: 500, fontSize: '15px', lineHeight: '21px', marginLeft: '5px'}}>Di chuyển</div>
            <div className="mx-3 h-2 w-2 rounded-full bg-black"></div>
            <div style={{color: '#212B36', fontWeight: 400, fontSize:'14px', lineHeight: '21px'}}>{data.total_time}</div>
        </div>
        <div className="flex" style={{marginTop: '5px'}}>
        <div style={{height: '20px', width: '20px', marginLeft: '5px', marginRight: '5px'}} className="flex items-center justify-center">
                <div style={{width: '15px', height: '18px', backgroundSize: 'Cover'}} className='icon_clock_default'></div>
            </div>
            <div style={{color: '#637381', fontWeight: 400, fontSize:'14px', lineHeight: '21px'}}>{data.time_moving}</div>
        </div>
        <div className="flex" style={{marginTop: '5px'}}>
            <div style={{height: '20px', width: '20px', marginLeft: '5px', marginRight: '5px'}} className="flex items-center justify-center">
                <div style={{width: '18px', height: '20px', backgroundSize: 'Cover', color: '#1877F2'}} className='icon_marker_blue'></div>
            </div>
            <div style={{color: '#1877F2', fontWeight: 400, fontSize: '14px', lineHeight: '21px'}}>
                {data.total_distance} Trip
            </div>
        </div>
    </>
}