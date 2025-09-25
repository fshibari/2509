import { type NextRequest, NextResponse } from "next/server"
import { env } from "@/lib/env"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const privatePdf = formData.get("privatePdf") as File | null
    const publicPdf = formData.get("publicPdf") as File | null
    const releaseId =
      (formData.get("releaseId") as string | null) || `Release_${Date.now()}`

    if (!privatePdf || !publicPdf) {
      return NextResponse.json(
        { ok: false, error: "Missing PDFs (privatePdf/publicPdf)" },
        { status: 400 },
      )
    }

    // Public
    const publicFormData = new FormData()
    publicFormData.append("chat_id", env.TELEGRAM_CHAT_ID)
    publicFormData.append("caption", `Public release: ${releaseId}`)
    publicFormData.append("document", publicPdf, "public-release.pdf")

    const publicResp = await fetch(
      `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendDocument`,
      { method: "POST", body: publicFormData },
    )
    const publicJson = await publicResp.json()
    if (!publicResp.ok || publicJson?.ok === false) {
      throw new Error(
        `Telegram public send failed: ${publicResp.status} ${publicJson?.description || ""}`,
      )
    }

    // Private
    const privateFormData = new FormData()
    privateFormData.append("chat_id", env.TELEGRAM_CHAT_ID)
    privateFormData.append("caption", `Private release: ${releaseId}`)
    privateFormData.append("document", privatePdf, "private-release.pdf")

    const privateResp = await fetch(
      `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendDocument`,
      { method: "POST", body: privateFormData },
    )
    const privateJson = await privateResp.json()
    if (!privateResp.ok || privateJson?.ok === false) {
      throw new Error(
        `Telegram private send failed: ${privateResp.status} ${privateJson?.description || ""}`,
      )
    }

    return NextResponse.json({
      ok: true,
      public: publicJson,
      private: privateJson,
    })
  } catch (error) {
    console.error("[telegram/send] error:", error)
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}
