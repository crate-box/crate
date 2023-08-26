import ImportForm from "./import-form"

export default function Import() {
  return (
    <>
      <div className="font-medium">Import</div>
      <div className="grid-cols-[repeat(3, 80px)] mt-2 grid gap-2">
        <ImportForm />
      </div>
    </>
  )
}
