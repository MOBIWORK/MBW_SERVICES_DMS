
import './SupervisoryStaff.css';

interface DataStartTimeLine{
    time_start: string;
    address: string;
    index_item: number;
    active_item: boolean;
}

export function  ItemStartTimeLineDot(){
    return <>
        <div style={{height:'36px', width:'36px', borderRadius:'32px', border:'1px solid #DFE3E8', gap:'8px'}} className="flex items-center justify-center">
            <div style={{width: '20px', height: '20px', backgroundSize: 'Cover'}} className='icon_starting'></div>
        </div>
    </>
}

export function ItemStartTimeLineContent({ data, onEventClickItem }: { data: DataStartTimeLine, onEventClickItem: any }){
    const handldeClickItem = () => {
        onEventClickItem(data.index_item);
    }

    return <>
        <div className='flex'>
            <div style={{cursor: "pointer", width: '100%'}} onClick={handldeClickItem}>
                <div className="flex items-center">
                    <div style={{color: '#212B36', fontWeight: 500, fontSize: '15px', lineHeight: '21px', marginLeft: '5px'}}>Bắt đầu</div>
                </div>
                <div className="flex" style={{marginTop: '5px'}}>
                <div style={{height: '20px', width: '20px', marginLeft: '5px', marginRight: '5px'}} className="flex items-center justify-center">
                        <div style={{width: '15px', height: '18px', backgroundSize: 'Cover'}} className='icon_clock_default'></div>
                    </div>
                <div style={{color: '#637381', fontWeight: 400, fontSize:'14px', lineHeight: '21px'}}>{data.time_start}</div>
                </div>
                <div className="flex" style={{marginTop: '5px'}}>
                    <div style={{height: '20px', width: '20px', marginLeft: '5px', marginRight: '5px'}} className="flex items-center justify-center">
                        <div style={{width: '15px', height: '18px', backgroundSize: 'Cover'}} className='icon_marker'></div>
                    </div>
                    <div style={{color: '#637381', fontWeight: 400, fontSize: '14px', lineHeight: '21px'}}>
                        {data.address}
                    </div>
                </div>
            </div>
            { data.active_item && (
                <div style={{ position: 'relative'}}>
                    <div style={{ position: 'absolute', right: '-16px', width: '6px', height: '100%', backgroundColor: '#1c6fdb' }}></div>
                </div>
            )}
        </div>
    </>
}