import type { ReactNode } from "react"
import Image from "next/image"
import useVideoThumbnail from "@/libs/hooks/useVideoThumbnail"
import { AspectRatio } from "./ui/aspect-ratio"

export default function Video({ id, children }: { id: string; children?: ReactNode }) {
  const { data } = useVideoThumbnail({ videoId: id })

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
