import requst from '@/untils/request'

let music = {
        querymusic:(data) =>requst.get('/api/querymusic',data)
    }


export default music