import type { RouterInputs } from "index"

import {
  cleanupDb,
  createProtectedCaller,
  createPublicCaller,
} from "~/lib/test-utils"

afterEach(async () => {
  await cleanupDb()
})

test("should not possible to create space if not signed in", async () => {
  const { caller } = createPublicCaller()
  const input: RouterInputs["space"]["create"] = {
    data: {
      title: "Test space title",
      description: "Test space description",
    },
  }
  await expect(caller.space.create(input)).rejects.toThrowError(/UNAUTHORIZED/)
})

test("should not possible to get a space by id if not signed in", async () => {
  const { caller } = createPublicCaller()
  const input: RouterInputs["space"]["byId"] = {
    id: "some-space-id",
  }
  await expect(caller.space.byId(input)).rejects.toThrowError(/UNAUTHORIZED/)
})

test("should create and get the space", async () => {
  const { caller } = await createProtectedCaller()
  const input: RouterInputs["space"]["create"] = {
    data: {
      title: "Test space title",
      description: "Test space body",
    },
  }
  const space = await caller.space.create(input)
  const spaceById = await caller.space.byId({ id: space.id })
  expect(spaceById).toMatchObject(input.data)
})

test("should not create a space with an invalid title", async () => {
  const { caller } = await createProtectedCaller()
  const input: RouterInputs["space"]["create"] = {
    data: {
      title: "",
      description: "Test space description",
    },
  }
  await expect(caller.space.create(input)).rejects.toThrowError(
    /Space title must not empty/
  )
})

test("should not create a space with an invalid description", async () => {
  const { caller } = await createProtectedCaller()
  const input: RouterInputs["space"]["create"] = {
    data: {
      title: "Test space title",
      description: "",
    },
  }
  await expect(caller.space.create(input)).rejects.toThrowError(
    /Space description must not empty/
  )
})

test("should not possible to update a space if not signed in", async () => {
  const { caller } = createPublicCaller()
  const input: RouterInputs["space"]["update"] = {
    id: "some-space-id",
    data: {
      title: "Update test space title",
    },
  }
  await expect(caller.space.update(input)).rejects.toThrowError(/UNAUTHORIZED/)
})

test("should create and update a space", async () => {
  const { caller } = await createProtectedCaller()
  const createInput: RouterInputs["space"]["create"] = {
    data: {
      title: "Test space title",
      description: "Test space description",
    },
  }
  const space = await caller.space.create(createInput)
  const updateInput: RouterInputs["space"]["update"] = {
    id: space.id,
    data: {
      icon: "space-icon",
      title: "Update test space title",
      description: "Update test space description",
      pinned: true,
      trashed: true,
    },
  }
  const updateSpace = await caller.space.update(updateInput)
  expect(updateSpace.id).toBe(updateInput.id)
  expect(updateSpace).toMatchObject(updateInput.data)
})

test("should not update space with an invalid title", async () => {
  const { caller } = await createProtectedCaller()
  const input: RouterInputs["space"]["update"] = {
    id: "some-space-id",
    data: {
      title: "",
    },
  }
  await expect(caller.space.update(input)).rejects.toThrowError(
    /Space title must not empty/
  )
})

test("should not update space with an invalid title", async () => {
  const { caller } = await createProtectedCaller()
  const input: RouterInputs["space"]["update"] = {
    id: "some-space-id",
    data: {
      title: "",
    },
  }
  await expect(caller.space.update(input)).rejects.toThrowError(
    /Space title must not empty/
  )
})

test("should not possible to delete a space if not signed in", async () => {
  const { caller } = createPublicCaller()
  await expect(
    caller.space.delete({ id: "some-space-id" })
  ).rejects.toThrowError(/UNAUTHORIZED/)
})

test("should not delete a space with an invalid space id", async () => {
  const { caller } = await createProtectedCaller()
  await expect(caller.space.delete({ id: "" })).rejects.toThrowError(
    /Space ID must not empty/
  )
})
