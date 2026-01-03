'use client'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function AnalyticsTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: pathname + searchParams.toString(),
      })
    }
  }, [pathname, searchParams])

  // scroll event listener can be added here if needed
  useEffect(() => {
    const handleScroll = () => {
      if (window.gtag) {
        window.gtag('event', 'scroll', {
          page_path: pathname + searchParams.toString(),
          scroll_position: window.scrollY,
        })
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [pathname, searchParams])

  return null
}
