import { useState, type ReactElement } from "react"
import { useDebounce } from "use-debounce"
import Layout from "@/components/Layout"
import type { NextPageWithLayout } from "./_app"
import Video from "@/components/Video"
import GridLayout from "@/components/GridLayout"
import useSearch from "@/libs/hooks/useSearch"
import { Input } from "@/components/ui/input"

const Page: NextPageWithLayout = () => {
  const [query, setQuery] = useState("")
  const [debouncedQuery] = useDebounce(query, 1_000)
  const { data } = useSearch({
    query: debouncedQuery,
    limit: 12,
    searchOptions: ["visual"],
    enabled: query.trim() !== "",
  })

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
