import Layout from "@/components/Layout"
import { type ReactElement } from "react"
import type { NextPageWithLayout } from "./_app"
import Video from "@/components/Video"
import GridLayout from "@/components/GridLayout"
import useClassification from "@/libs/hooks/useClassification"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const Page: NextPageWithLayout = () => {
  const { data, isLoading, hasNextPage, fetchNextPage } = useClassification({ limit: 12 })
  if (!data || isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <GridLayout>
        {data?.pages.map((page) =>
          page.data.map((index) => {
            return (
              <div key={index.video_id}>
                <Video id={index.video_id} />
                <div className="flex mt-4 pb-2 gap-1 flex-">
                  {index.classes.map((data) => (
                    <Badge key={data.name}>{data.name}</Badge>
                  ))}
                </div>
              </div>
            )
          })
        )}
      </GridLayout>
      {hasNextPage ? (
        <div className="flex justify-center py-4">
          <Button onClick={() => fetchNextPage()}>Load more</Button>
        </div>
      ) : null}
    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout route="classify">{page}</Layout>
}

export default Page
