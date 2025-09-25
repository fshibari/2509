import { z } from "zod"

const EnvSchema = z.object({
  TELEGRAM_BOT_TOKEN: z.string().min(1, "Missing TELEGRAM_BOT_TOKEN"),
  TELEGRAM_CHAT_ID: z.string().min(1, "Missing TELEGRAM_CHAT_ID"),
})

export const env = EnvSchema.parse({
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
  TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID,
})
