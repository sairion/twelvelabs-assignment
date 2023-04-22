import { useRouter } from "next/router"
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs"

export default function Layout({
  children,
  route,
}: {
  children: React.ReactNode
  route: "list" | "classify" | "search"
}) {
  const router = useRouter()
  return (
    <div className="relative flex min-h-screen flex-col">
      <header className="flex items-center justify-between sticky top-0 bg-white z-10 w-full border-b py-4 px-8">
        <h1>MeTube</h1>
        <Tabs
          defaultValue={route}
          className="w-[400px]"
          onValueChange={(value) => {
            router.push(`/${value}`)
          }}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="list">List</TabsTrigger>
            <TabsTrigger value="classify">Classify</TabsTrigger>
            <TabsTrigger value="search">Search</TabsTrigger>
          </TabsList>
        </Tabs>
      </header>
      <section className="flex-1">
        <main className="px-8 pt-4">{children}</main>
      </section>
    </div>
  )
}
