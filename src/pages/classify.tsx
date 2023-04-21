import Layout from "@/components/Layout"
import { type ReactElement } from "react"
import type { NextPageWithLayout } from "./_app"
import Video from "@/components/Video"
import GridLayout from "@/components/GridLayout"
import useClassification from "@/libs/hooks/useClassification"
import { Badge } from "@/components/ui/badge"

const Page: NextPageWithLayout = () => {
  const { data, isLoading } = useClassification({ limit: 12 })
  if (!data || isLoading) {
    return <div>Loading...</div>
  }

  return (
    <GridLayout>
      {data.data.map((index) => {
        return (
          <div key={index.video_id}>
            <Video id={index.video_id} />
            <div className="flex mt-4 pb-2 gap-1 flex-wrap">
              {index.classes.map((data) => (
                <Badge key={data.name}>{data.name}</Badge>
              ))}
            </div>
          </div>
        )
      })}
    </GridLayout>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout route="classify">{page}</Layout>
}

export default Page
