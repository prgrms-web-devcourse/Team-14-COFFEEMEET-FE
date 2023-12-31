import { axiosAPI } from '@/apis/axios'

interface AdminLoginData {
  id: string
  password: string
}

const AdminLoginAPI = {
  POST_ADMIN_LOGIN: async (adminLoginData: AdminLoginData) => {
    const response = await axiosAPI.post('/v1/admins/login', adminLoginData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data
  },
}

export default AdminLoginAPI
