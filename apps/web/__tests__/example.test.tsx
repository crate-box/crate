import { render, screen } from "@testing-library/react"

function HelloWorld() {
  return <div>Hello World</div>
}

test("render HelloWorld component", () => {
  render(<HelloWorld />)
  expect(screen.getByText(/Hello World/)).toBeInTheDocument()
})
