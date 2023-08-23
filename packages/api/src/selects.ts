import type { Prisma } from "@acme/db"

export const defaultUserSelect = {
  id: true,
  image: true,
  name: true,
  email: true,
} satisfies Prisma.UserSelect

export const defaultPageSelect = {
  id: true,
  icon: true,
  title: true,
  body: false,
  pinned: true,
  trashed: true,
  space: {
    select: {
      id: true,
      icon: true,
      title: true,
    },
  },
  createdAt: true,
  updatedAt: true,
  createdBy: { select: defaultUserSelect },
  editedBy: { select: defaultUserSelect },
} satisfies Prisma.PageSelect

export const singlePageSelect = {
  ...defaultPageSelect,
  body: true,
} satisfies Prisma.PageSelect

export const defaultSpaceSelect = {
  id: true,
  icon: true,
  title: true,
  description: true,
  members: { select: defaultUserSelect },
  pinned: true,
  trashed: true,
  pages: false,
  createdAt: true,
  updatedAt: true,
  createdBy: { select: defaultUserSelect },
  editedBy: { select: defaultUserSelect },
} satisfies Prisma.SpaceSelect

export const singleSpaceSelect = {
  ...defaultSpaceSelect,
  pages: { select: defaultPageSelect },
} satisfies Prisma.SpaceSelect

export const defaultSettingsSelect = {
  id: true,
  userId: true,
  globalFontFamily: true,
  globalFontSize: true,
  globalColorscheme: true,
  editorFontFamily: true,
  editorFontSize: true,
  editorTabSize: true,
  editorAutocomplete: true,
  editorHighlightActiveLine: true,
  editorLineNumbers: true,
  editorLineWrapping: true,
  editorLineHeight: true,
  previewCodeblockTheme: true,
} satisfies Prisma.SettingsSelect
