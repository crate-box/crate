import {
  cleanupDb,
  createProtectedCaller,
  createPublicCaller,
} from "~/lib/test-utils"

afterEach(async () => {
  await cleanupDb()
})

test("should not possible to get session if not signed in", async () => {
  const { caller } = createPublicCaller()
  await expect(caller.session.get()).rejects.toThrowError(/UNAUTHORIZED/)
})

test("should get user session", async () => {
  const { caller } = await createProtectedCaller()
  const session = await caller.session.get()
  expect(session).toBeTruthy()
})

test("should not possible to delete all sessions if not signed in", async () => {
  const { caller } = createPublicCaller()
  await expect(caller.session.deleteAll()).rejects.toThrowError(/UNAUTHORIZED/)
})

test("should delete all sessions from signed in devices", async () => {
  const { caller } = await createProtectedCaller()
  const deleteSessions = await caller.session.deleteAll()
  expect(deleteSessions.count).toBe(0)
})
