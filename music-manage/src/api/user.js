import requst from '@/untils/request'

let user = {
        login:(data) =>requst.post('/api/login',data)
    }


export default user