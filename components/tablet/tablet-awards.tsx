"use client"

import { useState } from "react"
import Image from "next/image"
import { useAwardImages } from "@/hooks/use-award-images"

export function TabletAwards() {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())
  const { images: awardImages, isLoading } = useAwardImages()

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index))
  }

  return (
    <section
      id="awards-tablet"
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #FBF6EC 0%, #F5DEB3 18%, #F5DEB3 100%)",
      }}
    >
      <div className="py-12 md:py-20">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "radial-gradient(#3d2b1f 1px, transparent 1px)", backgroundSize: "40px 40px" }}
        />

        <div className="w-full max-w-[1000px] mx-auto relative z-10 px-8">
          <div className="text-center mb-10 md:mb-16">
            <p className="text-xs uppercase tracking-[0.18em] text-accent mb-3 font-semibold opacity-85">Recognition</p>
            <h2 className="font-serif text-[#3d2b1f] text-2xl md:text-4xl font-medium">Awards & Certificates</h2>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-accent"></div>
            </div>
          ) : awardImages.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">No awards found</div>
          ) : (
            <div className="columns-2 gap-4">
              {awardImages.map((item, index) => (
                <div
                  key={item.src}
                  className="relative overflow-hidden rounded-lg group cursor-pointer bg-primary-foreground/5 mb-4 break-inside-avoid shadow-[0_8px_20px_rgba(0,0,0,0.06)]"
                  onContextMenu={(e) => e.preventDefault()}
                >
                  <Image
                    src={item.src || "/placeholder.svg"}
                    alt={item.alt}
                    width={item.isPortrait ? 300 : 400}
                    height={item.isPortrait ? 450 : 300}
                    loading="lazy"
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className={`w-full h-auto object-contain transition-all duration-500 group-hover:scale-105 pointer-events-none select-none ${
                      loadedImages.has(index) ? "opacity-100" : "opacity-0"
                    }`}
                    draggable={false}
                    onLoad={() => handleImageLoad(index)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white text-sm font-medium">{item.alt}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
