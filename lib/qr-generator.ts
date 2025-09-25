"use client"

import type { PrivateQRData, PublicQRData } from "@/lib/release-generator"
import QRCode from "qrcode"

// Generate a scannable QR code and return as data URL (PNG)
export async function generateQRCode(data: string, size = 256): Promise<string> {
  const canvas = document.createElement("canvas")
  await QRCode.toCanvas(canvas, data, { width: size, margin: 1, errorCorrectionLevel: "M" })
  return canvas.toDataURL("image/png")
}

// Generate a QR with a centered logo overlay
export async function generateQRWithLogo(data: string, logoUrl: string, size = 256): Promise<string> {
  const baseDataUrl = await generateQRCode(data, size)

  const canvas = document.createElement("canvas")
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext("2d")
  if (!ctx) throw new Error("Failed to get 2D context")

  const qrImg = new Image()
  await new Promise<void>((resolve, reject) => {
    qrImg.onload = () => resolve()
    qrImg.onerror = (e) => reject(e)
    qrImg.src = baseDataUrl
  })
  ctx.drawImage(qrImg, 0, 0, size, size)

  const logoImg = new Image()
  await new Promise<void>((resolve, reject) => {
    logoImg.onload = () => resolve()
    logoImg.onerror = (e) => reject(e)
    logoImg.src = logoUrl
  })

  const logoSize = Math.floor(size * 0.2)
  const logoX = Math.floor((size - logoSize) / 2)
  const logoY = Math.floor((size - logoSize) / 2)
  const pad = Math.floor(size * 0.02)

  ctx.fillStyle = "#ffffff"
  ctx.fillRect(logoX - pad, logoY - pad, logoSize + 2 * pad, logoSize + 2 * pad)
  ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize)

  return canvas.toDataURL("image/png")
}

// Convenience wrappers
export async function generatePrivateQR(data: PrivateQRData): Promise<string> {
  return generateQRCode(JSON.stringify(data), 512)
}

export async function generatePublicQR(data: PublicQRData): Promise<string> {
  return generateQRCode(JSON.stringify(data), 512)
}
