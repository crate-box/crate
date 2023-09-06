import type { RouterInputs } from "index"

import { Prisma, prisma } from "@acme/db"

import {
  cleanupDb,
  createProtectedCaller,
  createPublicCaller,
} from "~/lib/test-utils"

afterEach(async () => {
  await cleanupDb()
  const { ctx } = await createProtectedCaller()
  await prisma.settings.upsert({
    where: { userId: ctx.session?.user.id },
    update: {},
    create: {
      user: { connect: { id: ctx.session?.user.id } },
    },
  })
})

test("should not possible to get settings if not signed in", async () => {
  const { caller } = createPublicCaller()
  await expect(caller.settings.get()).rejects.toThrowError(/UNAUTHORIZED/)
})

test("should get settings", async () => {
  const { caller, ctx } = await createProtectedCaller()
  const settings = await caller.settings.get()
  expect(settings).toBeTruthy()
  expect(settings.userId).toBe(ctx.session?.user.id)
})

test("should not possible to update settings if not signed in", async () => {
  const { caller } = createPublicCaller()
  const input: RouterInputs["settings"]["update"] = {
    data: {
      globalFontFamily: "",
    },
  }
  await expect(caller.settings.update(input)).rejects.toThrowError()
})

test("should update settings", async () => {
  const { caller } = await createProtectedCaller()
  const input: RouterInputs["settings"]["update"] = {
    data: {
      globalFontFamily: "Roboto",
      globalFontSize: 14,
      globalColorscheme: "crux-gamma",
      editorFontFamily: "JetBrains Mono",
      editorFontSize: 14,
      editorLineHeight: 1.6,
      editorHighlightActiveLine: false,
      editorTabSize: 4,
      editorLineNumbers: false,
      editorLineWrapping: true,
      editorAutocomplete: false,
      previewCodeblockTheme: "one-dark-pro",
    },
  }
  const settings = await caller.settings.update(input)

  expect(settings).toMatchObject({
    ...input.data,
    // NOTE: `editorLineHeight` return type is Prisma.Decimal instead of number
    editorLineHeight: new Prisma.Decimal(input.data.editorLineHeight!),
  })
})

test("should not possible to update settings invalid `globalFontSize` value", async () => {
  const { caller } = await createProtectedCaller()
  const invalidIntInput: RouterInputs["settings"]["update"] = {
    data: {
      globalFontSize: 1.2,
    },
  }
  await expect(caller.settings.update(invalidIntInput)).rejects.toThrowError(
    /Global font size must be integer/
  )
  const invalidMinInput: RouterInputs["settings"]["update"] = {
    data: {
      globalFontSize: 6,
    },
  }
  await expect(caller.settings.update(invalidMinInput)).rejects.toThrowError(
    /Global font size must be at least 8px/
  )
})

test("should not possible to update settings invalid `globalColorscheme` value", async () => {
  const { caller } = await createProtectedCaller()
  const input: RouterInputs["settings"]["update"] = {
    data: {
      globalColorscheme: "",
    },
  }
  await expect(caller.settings.update(input)).rejects.toThrowError(
    /Global colorscheme must not empty/
  )
})

test("should not possible to update settings invalid `editorFontSize` value", async () => {
  const { caller } = await createProtectedCaller()
  const invalidIntInput: RouterInputs["settings"]["update"] = {
    data: {
      editorFontSize: 10.5,
    },
  }
  await expect(caller.settings.update(invalidIntInput)).rejects.toThrowError(
    /Editor font size must be integer/
  )
  const invalidMinInput: RouterInputs["settings"]["update"] = {
    data: {
      editorFontSize: 6,
    },
  }
  await expect(caller.settings.update(invalidMinInput)).rejects.toThrowError(
    /Editor font size must be at least 8px/
  )
})

test("should not possible to update settings invalid `editorTabSize` value", async () => {
  const { caller } = await createProtectedCaller()
  const input: RouterInputs["settings"]["update"] = {
    data: {
      editorTabSize: 10.5,
    },
  }
  await expect(caller.settings.update(input)).rejects.toThrowError(
    /Editor tab size must be integer/
  )
})

test("should not possible to update settings invalid `editorLineHeight` value", async () => {
  const { caller } = await createProtectedCaller()
  const input: RouterInputs["settings"]["update"] = {
    data: {
      editorLineHeight: 0.8,
    },
  }
  await expect(caller.settings.update(input)).rejects.toThrowError(
    /Editor line height must be at least 1.0/
  )
})

test("should not possible to update settings invalid `previewCodeblockTheme` value", async () => {
  const { caller } = await createProtectedCaller()
  const input: RouterInputs["settings"]["update"] = {
    data: {
      previewCodeblockTheme: "",
    },
  }
  await expect(caller.settings.update(input)).rejects.toThrowError(
    /Preview codeblock theme must not empty/
  )
})
