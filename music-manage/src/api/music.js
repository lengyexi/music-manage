import request from '@/utils/request'

let music = {
    querymusic:data => request.get('/api/querymusic',data),
    upload:data=>request.post('/api/upload',data),
    add:data=>request.post('/api/addmusic',data),
    del:data=>request.get('/api/deletemusic',data),
    update:data=>request.post('/api/updatemusic',data),
}

export default music