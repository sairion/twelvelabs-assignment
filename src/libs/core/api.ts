import ky from "ky"

const API_VERSION = "v1.1"
const api = ky.create({
  headers: {
    "x-api-key": process.env.NEXT_PUBLIC_TWLS_API_KEY as string,
  },
  prefixUrl: `${process.env.NEXT_PUBLIC_API_HOST}/p/${API_VERSION}`,
})

export default api
