import Header from "~/components/header"

export default function MarketingLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}
