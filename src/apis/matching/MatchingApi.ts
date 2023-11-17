import { axiosAPI } from '@/apis/axios'

const MatchingApi = {
  POST_MATCHING_START: async () => {
    const response = await axiosAPI.post('/api/v1/matching/start', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('accessToken'),
      },
    })
    return response.data
  },
}

export default MatchingApi
