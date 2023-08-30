import type { RouterInputs } from "index"

import {
  cleanupDb,
  createProtectedCaller,
  createPublicCaller,
} from "~/lib/test-utils"

afterEach(async () => {
  await cleanupDb()
})

test("should not possible to create page if not signed in", async () => {
  const { caller } = createPublicCaller()
  const input: RouterInputs["page"]["create"] = {
    data: {
      title: "Test page title",
    },
  }
  await expect(caller.page.create(input)).rejects.toThrowError(/UNAUTHORIZED/)
})

test("should not possible to get a page by id if not signed in", async () => {
  const { caller } = createPublicCaller()
  const input: RouterInputs["page"]["byId"] = {
    id: "some-page-id",
  }
  await expect(caller.page.byId(input)).rejects.toThrowError(/UNAUTHORIZED/)
})

test("should create and get the page", async () => {
  const { caller } = await createProtectedCaller()
  const input: RouterInputs["page"]["create"] = {
    data: {
      title: "Test page title",
      body: "Test page body",
    },
  }
  const page = await caller.page.create(input)
  const pageById = await caller.page.byId({ id: page.id })
  expect(pageById).toMatchObject(input.data)
})

test("should not create a page with an invalid title", async () => {
  const { caller } = await createProtectedCaller()
  const input: RouterInputs["page"]["create"] = {
    data: {
      title: "",
    },
  }
  await expect(caller.page.create(input)).rejects.toThrowError(
    /Page title must not empty/
  )
})

test("should not possible to update a page if not signed in", async () => {
  const { caller } = createPublicCaller()
  const input: RouterInputs["page"]["update"] = {
    id: "some-page-id",
    data: {
      title: "Update test page title",
    },
  }
  await expect(caller.page.update(input)).rejects.toThrowError(/UNAUTHORIZED/)
})

test("should create and update a page", async () => {
  const { caller } = await createProtectedCaller()
  const createInput: RouterInputs["page"]["create"] = {
    data: {
      title: "Test page title",
      body: "Test page body",
    },
  }
  const page = await caller.page.create(createInput)
  const updateInput: RouterInputs["page"]["update"] = {
    id: page.id,
    data: {
      icon: "page-icon",
      title: "Update test page title",
      body: "Update test page body",
      pinned: true,
      trashed: true,
    },
  }
  const updatePage = await caller.page.update(updateInput)
  expect(updatePage.id).toBe(updateInput.id)
  expect(updatePage).toMatchObject(updateInput.data)
})

test("should not update page with an invalid title", async () => {
  const { caller } = await createProtectedCaller()
  const input: RouterInputs["page"]["update"] = {
    id: "some-page-id",
    data: {
      title: "",
    },
  }
  await expect(caller.page.update(input)).rejects.toThrowError(
    /Page title must not empty/
  )
})

test("should not update page with an invalid title", async () => {
  const { caller } = await createProtectedCaller()
  const input: RouterInputs["page"]["update"] = {
    id: "some-page-id",
    data: {
      title: "",
    },
  }
  await expect(caller.page.update(input)).rejects.toThrowError(
    /Page must not empty/
  )
})

test("should not possible to delete a page if not signed in", async () => {
  const { caller } = createPublicCaller()
  await expect(caller.page.delete({ id: "some-page-id" })).rejects.toThrowError(
    /UNAUTHORIZED/
  )
})

test("should not delete a page with an invalid page id", async () => {
  const { caller } = await createProtectedCaller()
  await expect(caller.page.delete({ id: "" })).rejects.toThrowError(
    /Page ID must not empty/
  )
})
