"use client"

import type { PrivateQRData, PublicQRData } from "@/lib/release-generator"
import QRCode from "qrcode"

export async function generateQRCode(data: string, size = 256): Promise<string> {
  const canvas = document.createElement("canvas")
  await QRCode.toCanvas(canvas, data, { width: size, margin: 1, errorCorrectionLevel: "M" })
  return canvas.toDataURL("image/png")
}

export async function generateQRWithLogo(data: string, logoUrl: string, size = 256): Promise<string> {
  const base = await generateQRCode(data, size)

  const canvas = document.createElement("canvas")
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext("2d")
  if (!ctx) throw new Error("No 2D context")

  const qrImg = new Image()
  await new Promise<void>((res, rej) => {
    qrImg.onload = () => res()
    qrImg.onerror = (e) => rej(e)
    qrImg.src = base
  })
  ctx.drawImage(qrImg, 0, 0, size, size)

  const logo = new Image()
  await new Promise<void>((res, rej) => {
    logo.onload = () => res()
    logo.onerror = (e) => rej(e)
    logo.src = logoUrl
  })

  const s = Math.floor(size * 0.2)
  const x = Math.floor((size - s) / 2)
  const y = Math.floor((size - s) / 2)
  const pad = Math.floor(size * 0.02)

  ctx.fillStyle = "#fff"
  ctx.fillRect(x - pad, y - pad, s + 2 * pad, s + 2 * pad)
  ctx.drawImage(logo, x, y, s, s)

  return canvas.toDataURL("image/png")
}

export async function generatePrivateQR(data: PrivateQRData): Promise<string> {
  return generateQRCode(JSON.stringify(data), 512)
}

export async function generatePublicQR(data: PublicQRData): Promise<string> {
  return generateQRCode(JSON.stringify(data), 512)
}
