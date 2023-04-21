import useVideoThumbnail from "@/libs/hooks/useVideoThumbnail"
import { AspectRatio } from "./ui/aspect-ratio"
import Image from "next/image"

export default function Video({ id }: { id: string }) {
  const { data } = useVideoThumbnail({ videoId: id })

  if (!data) {
    return null
  }

  return (
    <AspectRatio ratio={16 / 9}>
      <Image fill src={data.thumbnail} alt="Video thumbnail image" className="rounded-md object-cover" />
    </AspectRatio>
  )
}
