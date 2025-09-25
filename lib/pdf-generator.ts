
"use client"

import jsPDF from "jspdf"
import type { ReleaseData } from "@/lib/types"
import { addTrilingualFontToJsPDF } from "@/lib/fonts/trilingual-font-base64"

const addNotoSansFont = async (pdf: jsPDF) => {
  try {
    addTrilingualFontToJsPDF(pdf)
    pdf.setFont("TrilingualFont", "normal")
  } catch (error) {
    console.warn("Font setup warning:", error)
    pdf.setFont("helvetica", "normal")
  }
}

interface PDFFormData {
  masterName: string
  masterPseudonym: string
  masterBirthDate: string
  masterPhone: string
  masterEmail: string
  masterSocial: string
  masterAddress: string

  modelName: string
  modelPseudonym: string
  modelBirthDate: string
  modelPhone: string
  modelEmail: string
  modelSocial: string
  modelAddress: string

  sessionLocation: string
  sessionDate: string
  sessionTime: string

  usageConditions: string[]
  restrictions: string[]
  healthConditions: string[]
}

const RELEASE_TEMPLATE = `УНІВЕРСАЛЬНИЙ РЕЛІЗ (Shibari + Фото/Відео)
NameRelease_<ID>_PRIVATE/PUBLIC                                                    Data

Мета договору (релізу)
Цей договір укладається з метою підтвердження добровільної участі Моделі у Shibari сесії та/або створенні фото- й відеоматеріалів, визначення умов використання матеріалів, фіксації меж і обмежень, а також розподілу відповідальності між ними. Договір регламентує творчу співпрацю між сторонами без створення трудових відносин, забезпечує захист законних прав та інтересів обох сторін і гарантує дотримання норм чинного законодавства Європейського Союзу та Румунії, включно з положеннями GDPR. Цей реліз формується, узгоджується та підписується сторонами до початку проведення сесії, що підкреслює добровільність та усвідомленість згоди Моделі на участь у процесі та створення матеріалів.

Місце проведення сесії (узгоджене сторонами): _______________
Дата проведення сесії (узгоджене сторонами): _______________
Час проведення сесії (узгоджене сторонами): _______________

Сторони

Сторона А: Майстер шибарі та фото/відео оператор (в одній особі)
Прізвище та ім'я: _______________
Псевдонім: _______________

Дата народження: _______________
Телефон: _______________
Email: _______________
Посилання на соцмережі: _______________

Адреса проживання: _______________

Сторона Б: Модель
Прізвище та ім'я: _______________
Псевдонім: _______________

Дата народження: _______________
Телефон: _______________
Email: _______________
Посилання на соцмережі: _______________

Адреса проживання: _______________

1. Предмет договору

1.1. Сторона А зобов'язується провести Shibari сесію та/або створити фото- й відеоматеріали за участю Сторони Б відповідно до узгоджених умов.

1.2. Сторона Б добровільно погоджується взяти участь у Shibari сесії та/або створенні фото- й відеоматеріалів.

1.3. Обидві сторони зобов'язуються дотримуватися всіх умов цього договору та забезпечувати безпеку під час проведення сесії.

2. Права та обов'язки сторін

2.1. Права Сторони А:
- Використовувати створені матеріали відповідно до умов цього договору
- Вимагати від Сторони Б дотримання узгоджених правил та обмежень
- Припинити сесію у разі порушення Стороною Б умов безпеки або договору

2.2. Обов'язки Сторони А:
- Забезпечити безпечне проведення Shibari сесії
- Дотримуватися всіх обмежень та побажань Сторони Б
- Надати Сторони Б копію підписаного договору
- Поважати гідність та приватність Сторони Б

2.3. Права Сторони Б:
- Встановлювати обмеження щодо дій під час сесії
- Припинити участь у сесії в будь-який момент
- Отримати копію підписаного договору
- Контролювати використання створених матеріалів відповідно до умов договору

2.4. Обов'язки Сторони Б:
- Повідомити про всі медичні протипоказання та обмеження
- Дотримуватися інструкцій Сторони А щодо безпеки
- Не розголошувати конфіденційну інформацію про Сторону А

3. Умови використання матеріалів

3.1. Створені під час сесії фото- та відеоматеріали можуть використовуватися Стороною А для:
{USAGE_CONDITIONS}

3.2. Сторона Б має право:
- Отримати копії всіх створених матеріалів
- Вимагати видалення матеріалів у випадках, передбачених цим договором
- Контролювати дотримання умов використання

4. Обмеження та заборони

4.1. Заборонено:
{RESTRICTIONS}

4.2. Сторона А зобов'язується:
- Не передавати матеріали третім особам без згоди Сторони Б
- Не використовувати матеріали в комерційних цілях без окремої угоди
- Видалити матеріали на вимогу Сторони Б у випадках порушення договору

5. Безпека та медичні аспекти

5.1. Сторона Б підтверджує:
{HEALTH_CONDITIONS}

5.2. Обидві сторони зобов'язуються:
- Дотримуватися принципів SSC (Safe, Sane, Consensual)
- Використовувати безпечні слова для припинення дій
- Регулярно перевіряти стан та самопочуття під час сесії

6. Конфіденційність

6.1. Обидві сторони зобов'язуються зберігати конфіденційність:
- Персональних даних
- Деталей проведеної сесії
- Приватної інформації, отриманої під час співпраці

7. Відповідальність

7.1. Кожна сторона несе відповідальність за:
- Дотримання умов цього договору
- Забезпечення власної безпеки
- Наслідки порушення узгоджених правил

7.2. Сторони звільняють одна одну від відповідальності за:
- Непередбачені обставини
- Наслідки неправдивої інформації про стан здоров'я
- Дії третіх осіб

8. Врегулювання спорів

8.1. Всі спори вирішуються шляхом переговорів.

8.2. У разі неможливості досягнення згоди, спори вирішуються відповідно до законодавства Румунії.

9. Заключні положення

9.1. Цей договір набирає чинності з моменту підписання обома сторонами.

9.2. Зміни до договору можливі лише за взаємною згодою сторін у письмовій формі.

9.3. Договір складено у двох примірниках, по одному для кожної сторони.

Підписи сторін:

Сторона А (Майстер): _________________ Дата: _________
                    (підпис)

Сторона Б (Модель): _________________ Дата: _________
                   (підпис)

Свідки (за наявності):
1. _________________ Дата: _________
2. _________________ Дата: _________`

const processTextForPDF = (text: string): string => {
  return text
    .replace(/’/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—]/g, "-")
}

const processConditionalContent = (template: string, formData: PDFFormData): string => {
  let processed = template

  const usage = (formData.usageConditions ?? [])
  const usageText = usage.length ? usage.map(u => `- ${u}`).join("\n") : "- Умови використання не вказані"
  processed = processed.replace(/\{{USAGE_CONDITIONS\}}|\{USAGE_CONDITIONS\}/g, usageText)

  const restr = (formData.restrictions ?? [])
  const restrText = restr.length ? restr.map(r => `- ${r}`).join("\n") : "- Обмеження не вказані"
  processed = processed.replace(/\{{RESTRICTIONS\}}|\{RESTRICTIONS\}/g, restrText)

  const health = (formData.healthConditions ?? [])
  const healthText = health.length ? health.map(h => `- ${h}`).join("\n") : "- Медичні умови не вказані"
  processed = processed.replace(/\{{HEALTH_CONDITIONS\}}|\{HEALTH_CONDITIONS\}/g, healthText)

  const replacements: Record<string, string> = {
    "NameRelease_<ID>": `Release_${Date.now()}`,
    "Data": new Date().toLocaleDateString("uk-UA"),
  }
  for (const [k,v] of Object.entries(replacements)) {
    processed = processed.replace(new RegExp(k, "g"), v)
  }

  return processed
}

export const generatePDF = async (formData: PDFFormData, options: { isPrivate: boolean }): Promise<Blob> => {
  const pdf = new jsPDF()
  await addNotoSansFont(pdf)
  pdf.setFontSize(10)
  pdf.setFont("TrilingualFont", "normal")

  const content = processTextForPDF(processConditionalContent(RELEASE_TEMPLATE, formData))

  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  const margin = 20
  const maxWidth = pageWidth - margin * 2
  const lineHeight = 6

  const lines = pdf.splitTextToSize(content, maxWidth)
  let y = margin

  for (const line of lines as string[]) {
    if (y > pageHeight - margin) {
      pdf.addPage()
      y = margin
    }
    pdf.text(line, margin, y)
    y += lineHeight
  }

  return pdf.output("blob")
}

function toPDFFormData(r: ReleaseData): PDFFormData {
  const date = new Date(r.timestamp)
  const fmtDate = isNaN(date.getTime()) ? "" : date.toLocaleDateString("uk-UA")
  const fmtTime = isNaN(date.getTime()) ? "" : date.toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" })

  const usage: string[] = []
  if (r.photoVideoRelease?.portfolio) usage.push("портфоліо")
  if (r.photoVideoRelease?.socialMedia) usage.push("соціальні мережі")
  if (r.photoVideoRelease?.exhibitions) usage.push("виставки")
  if (r.photoVideoRelease?.commercialUse) usage.push("комерційне використання")

  const restrictions = r.photoVideoRelease?.restrictions ? [r.photoVideoRelease.restrictions] : []
  const health = Array.isArray((r as any).shibariConsent?.medicalConditions) ? (r as any).shibariConsent?.medicalConditions : []

  return {
    masterName: r.partyA?.fullName ?? "",
    masterPseudonym: r.partyA?.pseudonym ?? "",
    masterBirthDate: r.partyA?.dateOfBirth ?? "",
    masterPhone: r.partyA?.phone ?? "",
    masterEmail: r.partyA?.email ?? "",
    masterSocial: r.partyA?.socialMedia ?? "",
    masterAddress: r.partyA?.address ?? "",

    modelName: r.partyB?.fullName ?? "",
    modelPseudonym: r.partyB?.pseudonym ?? "",
    modelBirthDate: r.partyB?.dateOfBirth ?? "",
    modelPhone: r.partyB?.phone ?? "",
    modelEmail: r.partyB?.email ?? "",
    modelSocial: r.partyB?.socialMedia ?? "",
    modelAddress: r.partyB?.address ?? "",

    sessionLocation: r.jurisdiction ?? "",
    sessionDate: fmtDate,
    sessionTime: fmtTime,

    usageConditions: usage,
    restrictions: restrictions,
    healthConditions: health,
  }
}

export const generatePDFsForTelegram = async (release: ReleaseData) => {
  try {
    const pdfData = toPDFFormData(release)
    const privateBlob = await generatePDF(pdfData, { isPrivate: true })
    const publicBlob = await generatePDF(pdfData, { isPrivate: false })

    const fd = new FormData()
    fd.append("privatePdf", privateBlob, "private-release.pdf")
    fd.append("publicPdf", publicBlob, "public-release.pdf")
    fd.append("releaseId", release.id || `Release_${Date.now()}`)

    const resp = await fetch("/api/telegram/send", { method: "POST", body: fd })
    if (!resp.ok) throw new Error(`Telegram send failed: ${resp.status} ${resp.statusText}`)

    const result = await resp.json()
    return { success: true, telegramSent: true, telegramResult: result }
  } catch (error) {
    console.error("[v0] PDF/TG error:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

export async function downloadPDF(formData: PDFFormData, filename = "release.pdf"): Promise<void> {
  const blob = await generatePDF(formData, { isPrivate: false })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export interface PDFOptions {
  isPrivate: boolean
  includeSignatures?: boolean
  customTemplate?: string
}
