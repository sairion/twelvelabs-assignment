import { useQuery } from "@tanstack/react-query"
import api from "@/libs/core/api"
import type { TWLSIndexListResponse } from "../core/apiTypes"

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
