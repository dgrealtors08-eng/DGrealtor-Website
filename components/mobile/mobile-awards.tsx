"use client"

import { useState, useMemo } from "react"
import { useAwardImages } from "@/hooks/use-award-images"

export function MobileAwards() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [errorImages, setErrorImages] = useState<Set<string>>(new Set())
  const { images: awardImages, isLoading } = useAwardImages()

  const { column1, column2 } = useMemo(() => {
    const mid = Math.ceil(awardImages.length / 2)
    return {
      column1: awardImages.slice(0, mid),
      column2: awardImages.slice(mid),
    }
  }, [awardImages])

  const handleImageError = (src: string) => {
    setErrorImages((prev) => new Set(prev).add(src))
  }

  return (
    <>
      <section
        id="awards"
        className="relative py-8 lg:hidden overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #FBF6EC 0%, #F5DEB3 30%, #F5DEB3 100%)",
        }}
      >
        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(#3d2b1f 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center px-5 mb-5">
            <p className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-1">Recognition</p>
            <h2 className="font-serif text-[#3d2b1f] text-2xl font-medium">Awards & Certificates</h2>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
            </div>
          ) : awardImages.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground text-sm">No awards found</div>
          ) : (
            /* 2 Column Scrolling Grid */
            <div className="relative h-[280px] overflow-hidden mx-4">
              {/* Gradient overlays for seamless loop effect */}
              <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-[#FBF6EC] to-transparent z-10 pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#F5DEB3] to-transparent z-10 pointer-events-none" />

              {/* 2 Column Grid */}
              <div className="flex gap-3 h-full">
                {/* Column 1 */}
                <div className="flex-1 overflow-hidden">
                  <div className="scroll-column-1 flex flex-col gap-3">
                    {[...column1, ...column1, ...column1].map((item, index) => (
                      <button
                        key={`col1-${index}`}
                        onClick={() => setSelectedImage(awardImages.indexOf(item))}
                        className="w-full rounded-xl overflow-hidden bg-white shadow-md flex-shrink-0 hover:shadow-lg transition-shadow relative group"
                        style={{ height: "140px" }}
                      >
                        {!errorImages.has(item.src) ? (
                          <img
                            src={item.src || "/placeholder.svg"}
                            alt={item.alt}
                            className="w-full h-full object-cover pointer-events-none select-none"
                            draggable={false}
                            onContextMenu={(e) => e.preventDefault()}
                            onError={() => handleImageError(item.src)}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-accent/5">
                            <span className="text-xs text-center text-muted-foreground font-medium px-2">
                              {item.alt}
                            </span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end">
                          <p className="text-white text-xs font-semibold p-2 leading-tight line-clamp-2">{item.alt}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Column 2 */}
                <div className="flex-1 overflow-hidden">
                  <div className="scroll-column-2 flex flex-col gap-3">
                    {[...column2, ...column2, ...column2].map((item, index) => (
                      <button
                        key={`col2-${index}`}
                        onClick={() => setSelectedImage(awardImages.indexOf(item))}
                        className="w-full rounded-xl overflow-hidden bg-white shadow-md flex-shrink-0 hover:shadow-lg transition-shadow relative group"
                        style={{ height: "140px" }}
                      >
                        {!errorImages.has(item.src) ? (
                          <img
                            src={item.src || "/placeholder.svg"}
                            alt={item.alt}
                            className="w-full h-full object-cover pointer-events-none select-none"
                            draggable={false}
                            onContextMenu={(e) => e.preventDefault()}
                            onError={() => handleImageError(item.src)}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-accent/5">
                            <span className="text-xs text-center text-muted-foreground font-medium px-2">
                              {item.alt}
                            </span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end">
                          <p className="text-white text-xs font-semibold p-2 leading-tight line-clamp-2">{item.alt}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage !== null && awardImages[selectedImage] && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 lg:hidden"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white"
            onClick={() => setSelectedImage(null)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="relative w-full max-w-md aspect-[3/4] flex items-center justify-center">
            <img
              src={awardImages[selectedImage].src || "/placeholder.svg"}
              alt={awardImages[selectedImage].alt}
              className="max-w-full max-h-full object-contain pointer-events-none select-none"
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
          <p className="absolute bottom-8 left-0 right-0 text-center text-white/80 text-sm px-4">
            {awardImages[selectedImage].alt}
          </p>
        </div>
      )}

      <style>{`
        @keyframes scroll-up-awards {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(calc(-33.33%));
          }
        }
        
        .scroll-column-1 {
          animation: scroll-up-awards 20s linear infinite;
        }
        
        .scroll-column-2 {
          animation: scroll-up-awards 20s linear infinite;
          animation-delay: -4s;
        }
      `}</style>
    </>
  )
}
