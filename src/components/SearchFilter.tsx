import type { Dispatch, SetStateAction } from "react"
import { Image as ImageIcon, MessageCircle, FileType, type LucideIcon } from "lucide-react"
import { type searchParamType } from "@/libs/hooks/useSearch"
import { Toggle } from "@/components/ui/toggle"
import { searchOption } from "@/libs/core/apiTypes"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

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

const SearchParamRadioGroup: React.FC<{
  label: string
  options: [string, string][]
  setOption(value: string): void
}> = ({ label, options, setOption }) => {
  return (
    <div>
      <small className="text-sm font-medium leading-none">{label}</small>
      <div className="flex pt-2 pb-4 gap-2">
        <RadioGroup defaultValue={options[0][0]} onValueChange={setOption}>
          {options.map(([value, label], idx) => {
            const id = `${label}-${idx}`
            return (
              <div key={label} className="flex items-center space-x-2">
                <RadioGroupItem value={value} id={id} />
                <Label htmlFor={id}>{label}</Label>
              </div>
            )
          })}
        </RadioGroup>
      </div>
    </div>
  )
}

export const defaultSearchParam = {
  groupBy: "clip",
  threshold: "low",
  sortOption: "score",
  conversationOption: "semantic",
  operator: "or",
  searchOptions: ["visual"],
} satisfies searchParamType

const SearchFilter: React.FC<{
  searchInterParams: searchParamType
  setInterSearchParams: Dispatch<SetStateAction<searchParamType>>
}> = ({ searchInterParams, setInterSearchParams }) => {
  const handleSetSearchOptions = (value: searchOption[]) =>
    setInterSearchParams({ ...searchInterParams, searchOptions: value })

  return (
    <div>
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
      <div className="grid md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1">
        <SearchParamRadioGroup
          label="Group by"
          options={[
            ["clip", "Clip"],
            ["video", "Video"],
          ]}
          setOption={(value: searchParamType["groupBy"]) => {
            setInterSearchParams({ ...searchInterParams, groupBy: value })
          }}
        />
        <SearchParamRadioGroup
          label="Operator"
          options={[
            ["or", "Or"],
            ["and", "And"],
          ]}
          setOption={(value: searchParamType["operator"]) => {
            setInterSearchParams({ ...searchInterParams, operator: value })
          }}
        />
        <SearchParamRadioGroup
          label="Sort Option"
          options={[
            ["score", "Score"],
            ["clip_count", "Clip Count"],
          ]}
          setOption={(value: searchParamType["sortOption"]) => {
            setInterSearchParams({ ...searchInterParams, sortOption: value })
          }}
        />
        <SearchParamRadioGroup
          label="Threshold"
          options={[
            ["low", "Low"],
            ["medium", "Medium"],
            ["high", "High"],
          ]}
          setOption={(value: searchParamType["threshold"]) => {
            setInterSearchParams({ ...searchInterParams, threshold: value })
          }}
        />
        {searchInterParams.searchOptions.length > 1 ? null : (
          <SearchParamRadioGroup
            label="Converation Option"
            options={[
              ["semantic", "Semantic"],
              ["exact_match", "Exact Match"],
            ]}
            setOption={(value: searchParamType["conversationOption"]) => {
              setInterSearchParams({ ...searchInterParams, conversationOption: value })
            }}
          />
        )}
      </div>
    </div>
  )
}

export default SearchFilter
