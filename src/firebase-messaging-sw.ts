// import 'firebase/messaging'

// import firebase from 'firebase/app'

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_apiKey,
//   authDomain: import.meta.env.VITE_authDomain,
//   projectId: import.meta.env.VITE_projectId,
//   storageBucket: import.meta.env.VITE_storageBucket,
//   messagingSenderId: import.meta.env.VITE_messagingSenderId,
//   appId: import.meta.env.VITE_appId,
//   measurementId: import.meta.env.VITE_measurementId,
// }

// firebase.initializeApp(firebaseConfig)

// const messaging = firebase.messaging()

// export function requestPermission() {
//   void Notification.requestPermission().then((permission) => {
//     if (permission === 'granted') {
//       messaging
//         .getToken({ vapidKey: import.meta.env.VITE_VAPID_KEY })
//         .then((token: string) => {
//           console.log(`푸시 토큰 발급 완료 : ${token}`)
//           return token
//         })
//         // .then(function (token) {
//         //   console.log('알림 왜 안 울려')
//         //   messaging.onMessage((payload) => {
//         //     alert('알림:' + payload.notification.body)
//         //   })
//         //   return token
//         // })
//         .catch((err) => {
//           console.log('푸시 토큰 가져오는 중에 에러 발생 : ', err)
//         })
//     } else if (permission === 'denied') {
//       console.log('푸시 권한 차단')
//     }
//   })
// }
// requestPermission()

// import 'firebase/messaging'

import firebase from 'firebase'
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
  measurementId: import.meta.env.VITE_measurementId,
}

firebase.initializeApp(firebaseConfig)
export async function getToken() {
  if (firebase.messaging.isSupported() === false) {
    console.log('isSupported: ', firebase.messaging.isSupported())
    return null
  }

  const messaging = firebase.messaging()
  const token = await messaging
    .requestPermission()
    .then(function () {
      return messaging.getToken({ vapidKey: import.meta.env.VITE_VAPID_KEY })
    })
    .then(function (token) {
      messaging.onMessage((payload) => {
        console.log('onMessage!!')
        alert('알림:' + payload.notification.body)
      })
      return token
    })
    .catch(function (err) {
      console.debug('에러 : ', err)
      return null
    })
  messaging.onMessage((payload) => {
    console.log('onMessage!!')
    alert('알림:' + payload.notification.body)
  })
  console.log('token:', token)
  return token
}
getToken()