import { useQuery } from "@tanstack/react-query"
import api from "@/libs/core/api"
import type { TWLSVideoThumbnailResponse } from "../core/apiTypes"

export default function useVideoThumbnail({ videoId }: { videoId: string }) {
  return useQuery({
    queryKey: ["video", videoId],
    queryFn: async () => {
      const response = await api.get(
        `indexes/${process.env.NEXT_PUBLIC_TWLS_LIST_INDEX_ID}/videos/${videoId}/thumbnail`
      )
      return response.json<TWLSVideoThumbnailResponse>()
    },
    retry: false,
  })
}
