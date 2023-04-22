import { Loader2 } from "lucide-react"

export function Loading() {
  return <Loader2 className="animate-spin text-gray-700" />
}

export function PageLoading() {
  return (
    <div className="flex items-center justify-center p-4">
      <Loading />
    </div>
  )
}
