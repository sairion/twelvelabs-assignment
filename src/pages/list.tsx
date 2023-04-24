import Layout from "@/components/Layout"
import { type ReactElement } from "react"
import type { NextPageWithLayout } from "./_app"
import useIndexList from "@/libs/hooks/useIndexList"
import Video from "@/components/Video"
import GridLayout from "@/components/GridLayout"
import { Button } from "@/components/ui/button"
import { PageLoading } from "@/components/Loading"

function formatTime(seconds: number) {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.round(seconds % 60)
  return [h, m > 9 ? m : h ? "0" + m : m || "0", s > 9 ? s : "0" + s].filter(Boolean).join(":")
}

const Page: NextPageWithLayout = () => {
  const { data, isLoading, hasNextPage, fetchNextPage } = useIndexList({ limit: 12 })
  if (!data || isLoading) {
    return <PageLoading />
  }

  return (
    <>
      <GridLayout>
        {data?.pages.map((page) =>
          page.data.map((index) => {
            const { filename, duration } = index.metadata
            return (
              <Video key={index._id} id={index._id}>
                <div className="text-xs py-2">
                  <div className="pb-2 truncate" title={filename}>
                    {filename}
                  </div>
                  <span className="text-muted-foreground">{formatTime(duration)}</span>
                </div>
              </Video>
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
  return <Layout route="list">{page}</Layout>
}

export default Page
