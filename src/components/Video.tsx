import useVideoThumbnail from "@/libs/hooks/useVideoThumbnail"

export default function Video({ id }: { id: string }) {
  const { data } = useVideoThumbnail({ videoId: id })

  if (!data) {
    return null
  }

  return (
    <div>
      <img src={data.thumbnail} />
    </div>
  )
}
