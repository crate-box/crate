import { auth } from "@acme/auth"

export async function getSession() {
  return await auth()
}
