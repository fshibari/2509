import { type NextRequest, NextResponse } from "next/server"
import { env } from "@/lib/env"

export async function GET(_req: NextRequest) {
  try {
    const form = new FormData()
    form.append("chat_id", env.TELEGRAM_CHAT_ID)
    form.append("text", "✅ Telegram test: credentials look good.")

    const resp = await fetch(
      `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      { method: "POST", body: form },
    )
    const json = await resp.json()
    if (!resp.ok || json?.ok === false) {
      throw new Error(`Telegram test failed: ${resp.status} ${json?.description || ""}`)
    }

    return NextResponse.json({ ok: true, result: json })
  } catch (error) {
    console.error("[telegram/test] error:", error)
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}
