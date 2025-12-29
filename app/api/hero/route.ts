import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET() {
  try {
    const heroDir = path.join(process.cwd(), "public/images/homepage-image")

    // Check if directory exists
    if (!fs.existsSync(heroDir)) {
      return NextResponse.json({ images: [] })
    }

    const files = fs.readdirSync(heroDir)

    // Filter for image files only
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"]
    const imageFiles = files.filter((file) => {
      const ext = path.extname(file).toLowerCase()
      return imageExtensions.includes(ext)
    })

    // Sort files to maintain consistent order
    imageFiles.sort()

    // Generate image data with auto-generated alt text from filename
    const images = imageFiles.map((file) => {
      const nameWithoutExt = path.basename(file, path.extname(file))
      // Convert filename to readable alt text
      const alt = nameWithoutExt.replace(/[-_]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())

      return {
        src: `/images/homepage-image/${file}`,
        alt,
        // Apply blur effect to specific images (hero-5 has historic building)
        blur: nameWithoutExt.toLowerCase().includes("hero-5"),
      }
    })

    return NextResponse.json({ images })
  } catch (error) {
    console.error("Error reading hero images directory:", error)
    return NextResponse.json({ images: [] })
  }
}
