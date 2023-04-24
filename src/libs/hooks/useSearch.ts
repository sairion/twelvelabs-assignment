import { useInfiniteQuery } from "@tanstack/react-query"
import api from "@/libs/core/api"
import type { TWLSSearchResponse, TWLSSearchResponseVideoGroup, searchOption } from "../core/apiTypes"

export type searchParamType = {
  groupBy: "clip" | "video"
  threshold: "high" | "medium" | "low"
  sortOption: "score" | "clip_count"
  conversationOption: "semantic" | "exact_match"
  operator: "and" | "or"
  searchOptions: searchOption[]
}

export default function useSearch({
  query,
  searchOptions,
  limit = 10,
  enabled,
  groupBy,
  threshold,
  sortOption,
  conversationOption,
  operator,
}: {
  query: string
  searchOptions: searchOption[]
  limit: number
  enabled: boolean
  groupBy: searchParamType["groupBy"]
  threshold: searchParamType["threshold"]
  sortOption: searchParamType["sortOption"]
  conversationOption: searchParamType["conversationOption"]
  operator: searchParamType["operator"]
}) {
  return useInfiniteQuery({
    queryKey: ["search", limit, searchOptions, groupBy, threshold, sortOption, conversationOption, operator, query],
    queryFn: async ({ pageParam }) => {
      if (pageParam) {
        const response = await api.get(`search/${pageParam}`)
        return response.json<TWLSSearchResponse<searchOption[]>>()
      } else {
        // FIXME: using simple Record type since it's obvious
        const json: Record<string, unknown> = {
          query,
          index_id: process.env.NEXT_PUBLIC_TWLS_LIST_INDEX_ID,
          search_options: searchOptions,
          page_limit: limit,
          sort_option: sortOption,
          group_by: groupBy,
          threshold,
          operator,
        }
        if (searchOptions.length === 1) {
          json.conversation_option = conversationOption
        }

        const response = await api.post(`search`, {
          json,
        })
        return response.json<TWLSSearchResponse | TWLSSearchResponseVideoGroup>()
      }
    },
    getNextPageParam: ({ page_info }) => page_info.next_page_token ?? undefined,
    enabled,
  })
}
