import { useQuery } from "@tanstack/react-query"
import api from "@/libs/core/api"
import type { TWLSSearchResponse, searchOption } from "../core/apiTypes"

export default function useSearch({
  query,
  searchOptions,
  limit = 10,
  enabled,
}: {
  query: string
  searchOptions: searchOption[]
  limit: number
  enabled: boolean
}) {
  return useQuery({
    queryKey: ["search", limit, searchOptions, query],
    queryFn: async () => {
      const response = await api.post(`search`, {
        json: {
          query,
          index_id: process.env.NEXT_PUBLIC_TWLS_LIST_INDEX_ID,
          search_options: searchOptions,
          page_limit: limit,
        },
      })
      return response.json<TWLSSearchResponse<searchOption[]>>()
    },
    retry: false,
    enabled,
  })
}
