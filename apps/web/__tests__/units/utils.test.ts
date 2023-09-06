import * as utils from "~/lib/utils"

test("should return a correct date string with default format string", () => {
  const date = "2023-07-13T13:00:00.000Z"
  expect(utils.formatDate(date)).toBe("Jul 13")
})

test("should return a correct date string with custom format string", () => {
  const date = "2023-07-13T13:00:00.000Z"
  const fmt = "yyyy-MM-dd"
  expect(utils.formatDate(date, fmt)).toBe("2023-07-13")
})

test("should return a kebab case string from a string that splited by spaces", () => {
  const name = "One Dark Pro"
  expect(utils.generateThemeKey(name)).toBe("one-dark-pro")
})

test("should set css variable and get it", () => {
  const obj = { "--clr-primary": "green" }
  utils.setGlobalCssVar(obj)
  const root = document.querySelector(":root")!
  const style = window.getComputedStyle(root)
  expect(style.getPropertyValue("--clr-primary")).toBe("green")
})

test("should get filename from a cloudinary url", () => {
  const url =
    "https://res.cloudinary.com/do8kcjco5/image/upload/v1693963533/q97lollzi9mvzihv9ohr.jpg"
  expect(utils.getAssetFilename(url)).toBe("q97lollzi9mvzihv9ohr.jpg")
})

test("should get video thumbnail url from a cloudinary video url", () => {
  const url =
    "https://res.cloudinary.com/do8kcjco5/video/upload/v1693966049/kdlp7e54ojyozyz0edxr.mp4"
  expect(utils.getVideoThumbnailUrl(url)).toBe(
    "https://res.cloudinary.com/do8kcjco5/video/upload/v1693966049/kdlp7e54ojyozyz0edxr.png"
  )
})
