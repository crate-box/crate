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
            globalFontSize: z.number().int(),
            globalColorscheme: z.string().min(1),
            editorFontFamily: z.string(),
            editorFontSize: z.number().int(),
            editorTabSize: z.number().int(),
            editorHighlightActiveLine: z.boolean(),
            editorLineNumbers: z.boolean(),
            editorAutocomplete: z.boolean(),
            editorLineWrapping: z.boolean(),
            previewCodeblockTheme: z.string().min(1),
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
