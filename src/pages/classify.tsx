import Layout from "@/components/Layout"
import type { ReactElement } from "react"
import type { NextPageWithLayout } from "./_app"

const Page: NextPageWithLayout = () => {
  return <div>...</div>
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout route="classify">{page}</Layout>
}

export default Page
