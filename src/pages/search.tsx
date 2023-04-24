import { useState, type ReactElement } from "react"
import { useDebouncedCallback } from "use-debounce"
import Layout from "@/components/Layout"
import type { NextPageWithLayout } from "./_app"
import { Video } from "@/components/Video"
import GridLayout from "@/components/GridLayout"
import useSearch, { type searchParamType } from "@/libs/hooks/useSearch"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PageLoading } from "@/components/Loading"
import SearchFilter, { defaultSearchParam } from "@/components/SearchFilter"
import { isVideoGroupResponse } from "@/libs/core/apiTypes"

const Page: NextPageWithLayout = () => {
  const [query, setQuery] = useState("")
  // intermediate search params
  const [searchInterParams, setInterSearchParams] = useState<searchParamType>(defaultSearchParam)
  // search options
  const [groupBy, setGroupBy] = useState<searchParamType["groupBy"]>(defaultSearchParam.groupBy)
  const [threshold, setThreshold] = useState<searchParamType["threshold"]>(defaultSearchParam.threshold)
  const [sortOption, setSortOption] = useState<searchParamType["sortOption"]>(defaultSearchParam.sortOption)
  const [conversationOption, setConversationOption] = useState<searchParamType["conversationOption"]>(
    defaultSearchParam.conversationOption
  )
  const [operator, setOperator] = useState<searchParamType["operator"]>(defaultSearchParam.operator)
  const [searchOptions, setSearchOptions] = useState<searchParamType["searchOptions"]>(
    defaultSearchParam.searchOptions.slice()
  )

  const {
    data,
    isLoading: isLoadingQuery,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useSearch({
    query: query,
    limit: 12,
    searchOptions,
    groupBy,
    threshold,
    sortOption,
    conversationOption,
    operator,
    enabled: false,
  })
  const handleSubmit = useDebouncedCallback(
    (inputValue) => {
      if (!inputValue) {
        return
      }
      setGroupBy(searchInterParams.groupBy)
      setThreshold(searchInterParams.threshold)
      setSortOption(searchInterParams.sortOption)
      setConversationOption(searchInterParams.conversationOption)
      setOperator(searchInterParams.operator)
      setSearchOptions(searchInterParams.searchOptions.slice())
      setQuery(inputValue)

      setTimeout(() => {
        refetch()
      }, 10)
    },
    1_100,
    { leading: true }
  )

  const isLoading = query !== "" && isLoadingQuery

  return (
    <div>
      <form className="flex mb-4 w-full items-center space-x-2">
        <Input name="input" placeholder="Type something... ex) food" />
        <Button
          type="submit"
          disabled={isLoading}
          onClick={(e) => {
            e.preventDefault()
            // @ts-ignore
            const form = new FormData(e.target?.form)
            const formProps = Object.fromEntries(form)
            const inputValue = formProps.input.toString().trim()
            handleSubmit(inputValue)
          }}>
          Search
        </Button>
      </form>
      <SearchFilter searchInterParams={searchInterParams} setInterSearchParams={setInterSearchParams} />
      <GridLayout>
        {data?.pages.map((page) => {
          return isVideoGroupResponse(page, groupBy)
            ? page.data.map(({ clips }, i) => {
                const clip = clips[0]
                const id = `${clips[0].video_id}-${i}`
                return (
                  <div key={id}>
                    <Video id={clip.video_id} thumbnailUrl={clip.thumbnail_url} />
                  </div>
                )
              })
            : page.data.map((index, i) => {
                // FIXME: API sends duplicated video ids sometimes
                return <Video key={`${index.video_id}-${i}`} id={index.video_id} />
              }) ?? null
        })}
      </GridLayout>
      {isLoading ? <PageLoading /> : null}
      {hasNextPage ? (
        <div className="flex justify-center py-4">
          <Button onClick={() => fetchNextPage()}>Load more</Button>
        </div>
      ) : null}
    </div>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout route="search">{page}</Layout>
}

export default Page
