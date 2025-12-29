"use client"

import useSWR from "swr"

export interface HeroImage {
  src: string
  alt: string
  blur?: boolean
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useHeroImages() {
  const { data, error, isLoading } = useSWR<{ images: HeroImage[] }>("/api/hero", fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    refreshInterval: 60000, // Auto-refresh every 60 seconds
    dedupingInterval: 5000,
  })

  return {
    images: data?.images || [],
    isLoading,
    error,
  }
}
