import './firebase-messaging-sw.ts'

import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import Layout from '@/components/layouts/Layout'
import AdminPage from '@/pages/admin'
import AdminLoginPage from '@/pages/admin/AdminLogin'
import ChatListPage from '@/pages/chatList'
import ChatListDetailPage from '@/pages/chatListDetail'
import ChattingPage from '@/pages/chatting'
import HomePage from '@/pages/home'
import LandingPage from '@/pages/landing'
import LoginPage from '@/pages/login'
import LoginPendingPage from '@/pages/loginPending'
import NotFoundPage from '@/pages/notFound/NotFound'
import ProfilePage from '@/pages/profile'
import PrivateRoute from '@/pages/redirect/PrivateRoute'
import RegisterPage from '@/pages/register'

import { getToken } from './firebase-messaging-sw.ts'

const App = () => {
  const firebaseMessageToken = async () => {
    await getToken()
    //추후 서버에 토큰을 저장하는 기능을 여기에 추가
  }
  useEffect(() => {
    firebaseMessageToken()
  }, [])
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<PrivateRoute auth={true} />}>
          <Route path={'/'} element={<HomePage />} />
          <Route path={'/profile/*'} element={<ProfilePage />} />
          <Route path={'/chatting'} element={<ChattingPage />} />
          <Route path={'/chat-list'} element={<ChatListPage />} />
          <Route path={'/chat-list-detail'} element={<ChatListDetailPage />} />
          <Route path={'*'} element={<NotFoundPage />}></Route>
        </Route>

        <Route element={<PrivateRoute auth={true} />}>
          <Route path={'/landing'} element={<LandingPage />} />
          <Route path={'/login'} element={<LoginPage />} />
          <Route path={'/login-pending-page'} element={<LoginPendingPage />} />
          <Route path={'/register/*'} element={<RegisterPage />} />
          <Route path={'/admin-login'} element={<AdminLoginPage />} />
          <Route path={'*'} element={<NotFoundPage />}></Route>
        </Route>

        <Route element={<PrivateRoute auth={true} superAuth={true} />}>
          <Route path={'/admin/*'} element={<AdminPage />}></Route>
          <Route path={'*'} element={<NotFoundPage />}></Route>
        </Route>
        <Route path={'*'} element={<NotFoundPage />}></Route>
      </Route>
    </Routes>
  )
}

export default App
