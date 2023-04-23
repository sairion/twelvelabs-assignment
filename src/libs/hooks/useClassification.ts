import { useInfiniteQuery } from "@tanstack/react-query"
import api from "@/libs/core/api"
import type { TWLSClassificationResponse } from "../core/apiTypes"
import { type classesType, prompts } from "../core/classifyPrompts"

export default function useClassification({ classes, limit = 10 }: { classes: classesType; limit?: number }) {
  return useInfiniteQuery({
    queryKey: ["classification", classes, limit],
    queryFn: async ({ pageParam }) => {
      if (pageParam) {
        const response = await api.get(`classify/${pageParam}`)
        return response.json<TWLSClassificationResponse>()
      } else {
        const response = await api.post(`classify/bulk`, {
          json: {
            options: ["visual", "conversation", "text_in_video"],
            index_id: process.env.NEXT_PUBLIC_TWLS_LIST_INDEX_ID,
            classes: classes.map((name) => ({ name, prompts: prompts[name] })),
            page_limit: limit,
          },
        })
        return response.json<TWLSClassificationResponse>()
      }
    },
    getNextPageParam: ({ page_info }) => page_info.next_page_token ?? undefined,
    retry: 2,
  })
}
