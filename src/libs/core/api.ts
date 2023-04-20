import ky from "ky"

const api = ky.create({
  headers: {
    "x-api-key": process.env.NEXT_PUBLIC_TWLS_API_KEY as string,
  },
  prefixUrl: `${process.env.NEXT_PUBLIC_API_HOST}/p/v1.1`,
})

export default api
