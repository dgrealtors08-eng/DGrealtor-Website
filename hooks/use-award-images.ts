"use client"

import useSWR from "swr"

export interface AwardImage {
  src: string
  alt: string
  isPortrait?: boolean
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useAwardImages() {
  const { data, error, isLoading } = useSWR<{ images: AwardImage[] }>("/api/awards", fetcher, {
    revalidateOnFocus: true, // Refresh when user returns to tab
    revalidateOnReconnect: true, // Refresh on network reconnect
    refreshInterval: 30000, // Auto-refresh every 30 seconds for new images
    dedupingInterval: 5000, // Dedupe requests within 5 seconds
  })

  return {
    images: data?.images || [],
    isLoading,
    error,
  }
}
