import Layout from "@/components/Layout"
import { useState, type ReactElement } from "react"
import type { NextPageWithLayout } from "./_app"
import { Video } from "@/components/Video"
import GridLayout from "@/components/GridLayout"
import useClassification from "@/libs/hooks/useClassification"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PageLoading } from "@/components/Loading"
import { classes, type classesType } from "@/libs/core/classifyPrompts"
import { Toggle } from "@/components/ui/toggle"

const Page: NextPageWithLayout = () => {
  const [selectedClasses, setSelectedClasses] = useState<classesType>([classes[0]])
  const { data, isLoading, hasNextPage, fetchNextPage } = useClassification({ classes: selectedClasses, limit: 12 })

  return (
    <>
      <div className="flex pt-2 pb-4 mb-4 gap-x-2">
        {classes.map((cls) => (
          <Toggle
            key={cls}
            aria-label={`Toggle ${cls}`}
            pressed={selectedClasses.includes(cls)}
            onPressedChange={(value) => {
              const nextState = value ? [...selectedClasses, cls] : selectedClasses.filter((item) => item !== cls)
              if (nextState.length > 0) {
                setSelectedClasses(nextState.sort())
              } else {
                alert("At least one option should be set.")
              }
            }}>
            {cls}
          </Toggle>
        ))}
      </div>
      {data && !isLoading ? (
        <GridLayout>
          {data.pages.map((page) =>
            page.data.map((index) => {
              console.log(index)
              return (
                <div key={index.video_id}>
                  <Video id={index.video_id} />
                  <div className="flex mt-4 pb-2 gap-1 flex-">
                    {index.classes.map((data) => (
                      <Badge
                        className="cursor-pointer"
                        key={data.name}
                        onClick={() => {
                          setSelectedClasses([data.name] as classesType)
                        }}>
                        {data.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )
            })
          )}
        </GridLayout>
      ) : (
        <PageLoading />
      )}
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
