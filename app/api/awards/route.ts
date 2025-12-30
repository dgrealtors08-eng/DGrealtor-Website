import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const nameOverrides: Record<string, string> = {
  "honda-bigwing-appreciation": "Honda BigWing Appreciation",
  "nar-india-achievement": "NAR-INDIA Certificate of Achievement",
  "teaa-ashwin-sheth-award": "Token of Appreciation",
}

export async function GET() {
  try {
    const awardsDir = path.join(process.cwd(), "public/images/awards-certificate-image")

    // Check if directory exists
    if (!fs.existsSync(awardsDir)) {
      return NextResponse.json({ images: [] })
    }

    const files = fs.readdirSync(awardsDir)

    // Filter for image files only
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"]
    const imageFiles = files.filter((file) => {
      const ext = path.extname(file).toLowerCase()
      return imageExtensions.includes(ext)
    })

    // Generate image data with auto-generated alt text from filename
    const images = imageFiles.map((file) => {
      const nameWithoutExt = path.basename(file, path.extname(file))

      const alt =
        nameOverrides[nameWithoutExt] ||
        nameWithoutExt.replace(/[-_]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())

      return {
        src: `/images/awards-certificate-image/${file}`,
        alt,
        // Detect portrait images based on common naming patterns
        isPortrait:
          nameWithoutExt.toLowerCase().includes("portrait") ||
          nameWithoutExt.toLowerCase().includes("appreciation") ||
          nameWithoutExt.toLowerCase().includes("destination-thane"),
      }
    })

    return NextResponse.json({ images })
  } catch (error) {
    console.error("Error reading awards directory:", error)
    return NextResponse.json({ images: [] })
  }
}
