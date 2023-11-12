import { http, HttpResponse } from 'msw'
const nickname = '주다다'

export const handlers = [
  http.get(`/v1/users/duplicate?nickname=${nickname}`, async () => {
    await sleep(200)
    return HttpResponse.json({
      data: {
        isDuplicate: true,
      },
    })
  }),
]

async function sleep(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout)
  })
}
