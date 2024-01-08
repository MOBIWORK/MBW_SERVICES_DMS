

export default function useCookie() {
    let {sid} = decodeURIComponent(document.cookie)
    console.log('isd',sid,document.cookie);
    
    if(sid) return true
    return false
}