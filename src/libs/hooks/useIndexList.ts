import { useQuery } from "@tanstack/react-query"
import api from "@/libs/core/api"

type TWLSIndex = {
  _id: string
  created_at: string
  updated_at: string
  metadata: {
    duration: number
    engine_id: string
    filename: string
    fps: number
    height: number
    size: number
    width: number
  }
}

type TWLSPageInfo = {
  page: number
  limit_per_page: number
  total_page: number
  total_results: number
  total_duration: number
}

type TWLSIndexListResponse = {
  data: TWLSIndex[]
  page_info: TWLSPageInfo
}

export default function useIndexList({ page = 1, limit = 10 }) {
  return useQuery({
    queryKey: ["indexList", page, limit],
    queryFn: async () => {
      const response = await api.get(`indexes/${process.env.NEXT_PUBLIC_TWLS_LIST_INDEX_ID}/videos`, {
        searchParams: {
          page,
          page_limit: limit,
        },
      })
      return response.json<TWLSIndexListResponse>()
    },
    retry: false,
  })
}
