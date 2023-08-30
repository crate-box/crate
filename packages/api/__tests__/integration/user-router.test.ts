import type { RouterInputs } from "index"

import { prisma } from "@acme/db"

import {
  cleanupDb,
  createProtectedCaller,
  createPublicCaller,
} from "~/lib/test-utils"

afterEach(async () => {
  await cleanupDb()
})

test("should not possible to search users if not signed in", async () => {
  const { caller } = createPublicCaller()
  const input: RouterInputs["user"]["search"] = { query: "test" }
  await expect(caller.user.search(input)).rejects.toThrowError(/UNAUTHORIZED/)
})

test("should create users, search and return only one user that matches the query", async () => {
  await prisma.user.createMany({
    data: [
      {
        name: "John Doe",
        email: "john@doe.com",
        image: "",
      },
      {
        name: "Mary Jane",
        email: "mary@jane.com",
        image: "",
      },
    ],
  })
  const { caller } = await createProtectedCaller()
  const input: RouterInputs["user"]["search"] = { query: "john" }
  const users = await caller.user.search(input)
  expect(users).toHaveLength(1)
})

test("should not possible to update user data if not signed in", async () => {
  const { caller } = createPublicCaller()
  const input: RouterInputs["user"]["update"] = {
    data: {
      name: "Update test user",
      email: "updatestuser@mail.com",
    },
  }
  await expect(caller.user.update(input)).rejects.toThrowError(/UNAUTHORIZED/)
})

test("should update user data", async () => {
  const { caller } = await createProtectedCaller()
  const input: RouterInputs["user"]["update"] = {
    data: {
      name: "Update test user",
      email: "updatestuser@mail.com",
    },
  }
  const user = await caller.user.update(input)
  expect(user).toMatchObject(input.data)
})

test("should not possible to update user data with invalid data", async () => {
  const { caller } = await createProtectedCaller()

  const invalidNameInput: RouterInputs["user"]["update"] = {
    data: {
      name: "",
    },
  }
  await expect(caller.user.update(invalidNameInput)).rejects.toThrowError(
    /Account name must not empty/
  )

  const invalidEmailInput: RouterInputs["user"]["update"] = {
    data: {
      email: "invalidemail.com",
    },
  }
  await expect(caller.user.update(invalidEmailInput)).rejects.toThrowError(
    /Invalid email address/
  )
})

test("should not possible to delete user account if not signed in", async () => {
  const { caller } = createPublicCaller()
  await expect(caller.user.delete()).rejects.toThrowError(/UNAUTHORIZED/)
})

test("should delete user account", async () => {
  const { ctx, caller } = await createProtectedCaller()
  const deleteUser = await caller.user.delete()
  expect(deleteUser.id).toBe(ctx.session?.user.id)
})
