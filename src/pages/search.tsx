import { useState, type ReactElement, Dispatch, SetStateAction, FormEvent } from "react"
import { useDebouncedCallback } from "use-debounce"
import { Image as ImageIcon, MessageCircle, FileType, type LucideIcon } from "lucide-react"
import Layout from "@/components/Layout"
import type { NextPageWithLayout } from "./_app"
import Video from "@/components/Video"
import GridLayout from "@/components/GridLayout"
import useSearch from "@/libs/hooks/useSearch"
import { Input } from "@/components/ui/input"
import { Toggle } from "@/components/ui/toggle"
import { searchOption } from "@/libs/core/apiTypes"
import { Button } from "@/components/ui/button"
import { Loading } from "@/components/Loading"

const SearchOptionToggle: React.FC<{
  optionKey: searchOption
  label: string
  icon: LucideIcon
  searchOptions: searchOption[]
  setSearchOptions: Dispatch<SetStateAction<searchOption[]>>
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

const Page: NextPageWithLayout = () => {
  const [query, setQuery] = useState("")
  const [searchOptions, setSearchOptions] = useState<searchOption[]>(["visual"])
  const { data, isLoading, hasNextPage, fetchNextPage, refetch } = useSearch({
    query: query,
    limit: 12,
    searchOptions: searchOptions,
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

      setQuery(inputValue)
    },
    1_100,
    { leading: true }
  )

  const isSubmitting = query !== "" && (isLoading || handleSubmit.isPending())

  return (
    <div>
      <form className="flex mb-4 w-full items-center space-x-2">
        <Input name="input" placeholder="Type something... ex) food" />
        <Button
          type="submit"
          disabled={isSubmitting}
          onClick={(e) => {
            e.preventDefault()
            // @ts-ignore
            const form = new FormData(e.target?.form)
            const formProps = Object.fromEntries(form)
            const inputValue = formProps.input.toString().trim()
            handleSubmit(inputValue)
          }}>
          {isSubmitting ? <Loading /> : "Search"}
        </Button>
      </form>
      <div>
        <small className="text-sm font-medium leading-none">Search Options</small>
        <div className="flex pt-2 pb-4 gap-2">
          <SearchOptionToggle
            optionKey="visual"
            label="Visual"
            icon={ImageIcon}
            searchOptions={searchOptions}
            setSearchOptions={setSearchOptions}
          />
          <SearchOptionToggle
            optionKey="conversation"
            label="Conversation"
            icon={MessageCircle}
            searchOptions={searchOptions}
            setSearchOptions={setSearchOptions}
          />
          <SearchOptionToggle
            optionKey="text_in_video"
            label="Text in Video"
            icon={FileType}
            searchOptions={searchOptions}
            setSearchOptions={setSearchOptions}
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
