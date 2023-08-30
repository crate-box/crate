import { z } from "zod"

import { defaultSettingsSelect } from "../selects"
import { protectedProcedure, router } from "../trpc"

export const settingsRouter = router({
  get: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.settings.upsert({
      where: { userId: ctx.session.user.id },
      update: {},
      create: { userId: ctx.session.user.id },
      select: defaultSettingsSelect,
    })
  }),
  update: protectedProcedure
    .input(
      z.object({
        data: z
          .object({
            globalFontFamily: z.string(),
            globalFontSize: z
              .number()
              .int({ message: "Global font size must be integer" })
              .min(8, { message: "Global font size must be at least 8px" }),
            globalColorscheme: z.string().min(1, {
              message: "Global colorscheme must not empty",
            }),
            editorFontFamily: z.string(),
            editorFontSize: z
              .number()
              .int({ message: "Editor font size must be integer" })
              .min(8, { message: "Editor font size must be at least 8px" }),
            editorTabSize: z
              .number()
              .int({ message: "Editor tab size must be integer" }),
            editorHighlightActiveLine: z.boolean(),
            editorLineNumbers: z.boolean(),
            editorAutocomplete: z.boolean(),
            editorLineWrapping: z.boolean(),
            editorLineHeight: z
              .number()
              .min(1, { message: "Editor line height must be at least 1.0" }),
            previewCodeblockTheme: z
              .string()
              .min(1, { message: "Preview codeblock theme must not empty" }),
          })
          .partial(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.settings.update({
        where: { userId: ctx.session.user.id },
        data: input.data,
        select: defaultSettingsSelect,
      })
    }),
})
