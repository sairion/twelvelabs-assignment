import Layout from "@/components/Layout"
import { useState, type ReactElement } from "react"
import type { NextPageWithLayout } from "./_app"
import Video from "@/components/Video"
import GridLayout from "@/components/GridLayout"
import useSearch from "@/libs/hooks/useSearch"
import { Input } from "@/components/ui/input"

const Page: NextPageWithLayout = () => {
  const [query, setQuery] = useState("")
  // TODO: use usedebounce hook to reduce requests
  const { data } = useSearch({ query, limit: 12, searchOptions: ["visual"] })

  return (
    <div>
      <div className="mb-4">
        <Input
          onChange={(e) => {
            setQuery(e.target.value)
          }}
        />
      </div>
      <GridLayout>
        {data?.data.map((index) => {
          return <Video key={index.video_id} id={index.video_id} />
        }) ?? null}
      </GridLayout>
    </div>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout route="search">{page}</Layout>
}

export default Page
