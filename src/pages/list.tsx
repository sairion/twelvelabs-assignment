import Layout from "@/components/Layout"
import { type ReactElement } from "react"
import type { NextPageWithLayout } from "./_app"
import useIndexList from "@/libs/hooks/useIndexList"
import Video from "@/components/Video"
import GridLayout from "@/components/GridLayout"
import { Button } from "@/components/ui/button"

const Page: NextPageWithLayout = () => {
  const { data, isLoading, hasNextPage, fetchNextPage } = useIndexList({ limit: 12 })
  if (!data || isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <GridLayout>
        {data?.pages.map((page) =>
          page.data.map((index) => {
            return <Video key={index._id} id={index._id} />
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
