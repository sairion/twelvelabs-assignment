import useIndexList from "@/libs/hooks/useIndexList"

export default function Home() {
  const { data } = useIndexList({ page: 1 })

  return (
    <main className="">
      <div>Hello World!</div>
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </main>
  )
}
