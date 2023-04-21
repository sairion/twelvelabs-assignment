import Layout from "@/components/Layout"
import { type ReactElement } from "react"
import type { NextPageWithLayout } from "./_app"
import useIndexList from "@/libs/hooks/useIndexList"
import Video from "@/components/Video"
import GridLayout from "@/components/GridLayout"

const Page: NextPageWithLayout = () => {
  const { data, isLoading } = useIndexList({ limit: 12 })
  if (!data || isLoading) {
    return <div>Loading...</div>
  }

  return (
    <GridLayout>
      {data.data.map((index) => {
        return <Video key={index._id} id={index._id} />
      })}
    </GridLayout>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout route="list">{page}</Layout>
}

export default Page
