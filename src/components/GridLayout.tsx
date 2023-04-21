import type { ReactNode } from "react"

export default function GridLayout({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-3 gap-x-6 gap-y-4">{children}</div>
}
