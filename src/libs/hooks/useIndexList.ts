import { useInfiniteQuery } from "@tanstack/react-query"
import api from "@/libs/core/api"
import type { TWLSIndexListResponse } from "../core/apiTypes"

export default function useIndexList({ limit = 10 }) {
  return useInfiniteQuery({
    queryKey: ["indexList", limit],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await api.get(`indexes/${process.env.NEXT_PUBLIC_TWLS_LIST_INDEX_ID}/videos`, {
        searchParams: {
          page: pageParam,
          page_limit: limit,
        },
      })
      return response.json<TWLSIndexListResponse>()
    },
    getNextPageParam: ({ page_info }) => {
      return page_info.page + 1 > page_info.total_page ? undefined : page_info.page + 1
    },
  })
}
