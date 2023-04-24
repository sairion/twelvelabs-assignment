import { useQuery } from "@tanstack/react-query"
import api from "@/libs/core/api"
import type { TWLSVideoResponse } from "../core/apiTypes"

export default function useVideo({ id, enabled }: { id: string; enabled: boolean }) {
  return useQuery({
    queryKey: ["video", id],
    queryFn: async () => {
      const response = await api.get(`indexes/${process.env.NEXT_PUBLIC_TWLS_LIST_INDEX_ID}/videos/${id}`)
      return response.json<TWLSVideoResponse>()
    },
    retry: false,
    enabled,
  })
}
