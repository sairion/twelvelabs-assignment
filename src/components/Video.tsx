import type { ReactNode } from "react"
import Image from "next/image"
import useVideoThumbnail from "@/libs/hooks/useVideoThumbnail"
import { AspectRatio } from "./ui/aspect-ratio"
import useVideo from "@/libs/hooks/useVideo"

function formatTime(seconds: number) {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.round(seconds % 60)
  return [h, m > 9 ? m : h ? "0" + m : m || "0", s > 9 ? s : "0" + s].filter(Boolean).join(":")
}

export function VideoThumbnail({ id, children }: { id: string; children?: ReactNode }) {
  const { data } = useVideoThumbnail({ id })

  if (!data) {
    return null
  }

  return (
    <div>
      <AspectRatio ratio={16 / 9}>
        <Image fill src={data.thumbnail} alt="Video thumbnail image" className="rounded-md object-cover" />
      </AspectRatio>
      {children}
    </div>
  )
}

export function Video({ id, filename, duration }: { id: string; filename?: string; duration?: number }) {
  const enabled = typeof filename !== "string" || typeof duration !== "number"
  const { data } = useVideo({ id, enabled })

  filename = filename ?? data?.metadata.filename ?? ""
  duration = duration ?? data?.metadata.duration ?? 0

  return (
    <VideoThumbnail id={id}>
      {filename && duration ? (
        <div className="text-xs py-2">
          <div className="pb-2 truncate" title={filename}>
            {filename}
          </div>
          <span className="text-muted-foreground">{formatTime(duration)}</span>
        </div>
      ) : null}
    </VideoThumbnail>
  )
}
