import request from '@/utils/request'

let user = {
    login:data => request.post('/api/login',data),
    registry:data => request.post('/api/registry',data),
    getInfo:() => request.get('/api/userinfo')
}

export default user