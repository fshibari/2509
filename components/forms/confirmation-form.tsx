"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertCircle, FileText, Users, Shield, Camera } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useForm } from "@/contexts/form-context"
import { DigitalSignaturePad } from "@/components/signature/digital-signature-pad"
import { generatePDFsForTelegram } from "@/lib/pdf-generator"
import { generateReleasePreview, validateReleaseData, generateRelease } from "@/lib/release-generator"
import { CameraCapture } from "@/components/camera/camera-capture"
import type { CapturedPhoto } from "@/types/photo"

const withPhotoDefaults = (p?: {
  partyAId?: string
  partyBId?: string
  partyASelfie?: string
  partyBSelfie?: string
  jointPhoto?: string
}) => ({
  partyAId: p?.partyAId ?? "",
  partyBId: p?.partyBId ?? "",
  partyASelfie: p?.partyASelfie ?? "",
  partyBSelfie: p?.partyBSelfie ?? "",
  jointPhoto: p?.jointPhoto ?? "",
})


function pruneUndefinedDeep<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj)) as T
}

interface ConfirmationFormProps {
  onNext: () => void
  onBack: () => void
}

export function ConfirmationForm({ onNext, onBack }: ConfirmationFormProps) {
  const { t } = useLanguage()
  const { formData, generatedRelease, setGeneratedRelease, updateFormData } = useForm()

  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSendingToTelegram, setIsSendingToTelegram] = useState(false)
  const [telegramSent, setTelegramSent] = useState(false)

  const partyASignature = formData.signatures?.partyA || null
  const partyBSignature = formData.signatures?.partyB || null
  const jointSelfie = formData.photos?.jointPhoto || null
  const [showJointSelfieCamera, setShowJointSelfieCamera] = useState(false)

  const preview = generateReleasePreview(formData)
  const validation = validateReleaseData(formData)

  const handleGenerateRelease = async () => {
    try {
      setIsGenerating(true)
      setError(null)

      if (!validation.isValid) {
        setError(`Помилки валідації: ${validation.errors.join(", ")}`)
        return
      }

      if (!partyASignature || !partyBSignature || !jointSelfie) {
        setError("Необхідно надати підписи обох сторін та спільне селфі")
        return
      }

      const timestamp = new Date().toISOString()
      let geolocation = null

      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 60000,
          })
        })
        geolocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        }
      } catch (geoError) {
        // Geolocation failed, continue without it
      }

      const updatedFormData = {
        ...formData,
        signatures: {
          partyA: partyASignature,
          partyB: partyBSignature,
          timestamp,
          geolocation,
        },
        photos: {
          ...formData.photos,
          jointSelfie: jointSelfie,
        },
      }

      const release = await generateRelease(pruneUndefinedDeep(updatedFormData))
      setGeneratedRelease(release)

      await handleSendToTelegram(release)

      onNext()
    } catch (err) {
      setError("Помилка генерації договору. Спробуйте ще раз.")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSendToTelegram = async (release: any) => {
    try {
      setIsSendingToTelegram(true)

      const telegramFormData = {
        ...release.releaseData,
        releaseId: release.releaseData.id,
      }

      const result = await generatePDFsForTelegram(telegramFormData)

      if (result.telegramSent) {
        setTelegramSent(true)
        console.log("[v0] Telegram sending successful:", result.telegramResult)
      } else {
        setError("Договір створено, але не вдалося відправити в Telegram")
      }
    } catch (error) {
      console.error("[v0] Telegram sending error:", error)
      setError("Договір створено, але не вдалося відправити в Telegram")
    } finally {
      setIsSendingToTelegram(false)
    }
  }

  const handleJointSelfieCapture = (photo: CapturedPhoto) => {
  updateFormData({
    photos: withPhotoDefaults({
      ...formData.photos,
      jointPhoto: photo.dataUrl,
    }),
  })
  setShowJointSelfieCamera(false)

})