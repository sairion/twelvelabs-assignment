import Layout from "@/components/Layout"
import { type ReactElement } from "react"
import type { NextPageWithLayout } from "./_app"
import Video from "@/components/Video"
import GridLayout from "@/components/GridLayout"
import useClassification from "@/libs/hooks/useClassification"

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
            {index.classes.map((data) => (
              <>{data.name}</>
            ))}
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
