import { useState, type ReactElement, Dispatch, SetStateAction, FormEvent } from "react"
import { useDebouncedCallback } from "use-debounce"
import { Image as ImageIcon, MessageCircle, FileType, type LucideIcon } from "lucide-react"
import Layout from "@/components/Layout"
import type { NextPageWithLayout } from "./_app"
import { Video } from "@/components/Video"
import GridLayout from "@/components/GridLayout"
import useSearch, { type searchParamType } from "@/libs/hooks/useSearch"
import { Input } from "@/components/ui/input"
import { Toggle } from "@/components/ui/toggle"
import { searchOption } from "@/libs/core/apiTypes"
import { Button } from "@/components/ui/button"
import { PageLoading } from "@/components/Loading"

const SearchOptionToggle: React.FC<{
  optionKey: searchOption
  label: string
  icon: LucideIcon
  searchOptions: searchOption[]
  setSearchOptions(value: searchOption[]): void
}> = ({ optionKey, label, searchOptions, setSearchOptions, icon: Icon }) => {
  return (
    <Toggle
      aria-label={`Toggle ${label}`}
      pressed={searchOptions.includes(optionKey)}
      onPressedChange={(value) => {
        const nextState = value ? [...searchOptions, optionKey] : searchOptions.filter((item) => item !== optionKey)
        if (nextState.length > 0) {
          setSearchOptions(nextState.sort())
        } else {
          alert("At least one option should be set.")
        }
      }}>
      <Icon className="mr-2 h-4 w-4" />
      {label}
    </Toggle>
  )
}

const defaultSearchParam = {
  groupBy: "clip",
  threshold: "low",
  sortOption: "score",
  conversationOption: "semantic",
  operator: "or",
  searchOptions: ["visual"],
} satisfies searchParamType

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
    enabled: query !== "",
  })
  const handleSubmit = useDebouncedCallback(
    (inputValue) => {
      if (!inputValue) {
        return
      }
      if (inputValue === query) {
        refetch()
        return
      }

      setGroupBy(searchInterParams.groupBy)
      setThreshold(searchInterParams.threshold)
      setSortOption(searchInterParams.sortOption)
      setConversationOption(searchInterParams.conversationOption)
      setOperator(searchInterParams.operator)
      setSearchOptions(searchInterParams.searchOptions.slice())
      setQuery(inputValue)
    },
    1_100,
    { leading: true }
  )

  const isLoading = query !== "" && (isLoadingQuery || handleSubmit.isPending())

  const handleSetSearchOptions = (value: searchOption[]) =>
    setInterSearchParams({ ...searchInterParams, searchOptions: value })

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
      <div>
        <small className="text-sm font-medium leading-none">Search Options</small>
        <div className="flex pt-2 pb-4 gap-2">
          <SearchOptionToggle
            optionKey="visual"
            label="Visual"
            icon={ImageIcon}
            searchOptions={searchInterParams.searchOptions}
            setSearchOptions={handleSetSearchOptions}
          />
          <SearchOptionToggle
            optionKey="conversation"
            label="Conversation"
            icon={MessageCircle}
            searchOptions={searchInterParams.searchOptions}
            setSearchOptions={handleSetSearchOptions}
          />
          <SearchOptionToggle
            optionKey="text_in_video"
            label="Text in Video"
            icon={FileType}
            searchOptions={searchInterParams.searchOptions}
            setSearchOptions={handleSetSearchOptions}
          />
        </div>
      </div>
      <GridLayout>
        {data?.pages.map(
          (page) =>
            page.data.map((index, i) => {
              // FIXME: API sends duplicated video ids sometimes
              return <Video key={`${index.video_id}-${i}`} id={index.video_id} />
            }) ?? null
        )}
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
