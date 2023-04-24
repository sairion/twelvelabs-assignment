import { useQuery } from "@tanstack/react-query"
import api from "@/libs/core/api"
import type { TWLSVideoThumbnailResponse } from "../core/apiTypes"

export default function useVideoThumbnail({ id, enabled }: { id: string; enabled: boolean }) {
  return useQuery({
    queryKey: ["videoThumbnail", id],
    queryFn: async () => {
      const response = await api.get(`indexes/${process.env.NEXT_PUBLIC_TWLS_LIST_INDEX_ID}/videos/${id}/thumbnail`)
      return response.json<TWLSVideoThumbnailResponse>()
    },
    retry: false,
    enabled,
  })
}
