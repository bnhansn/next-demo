import { useEffect } from 'react'

export default function useScrollFreeze() {
  useEffect(() => {
    // Freeze window scroll position
    const scrollY = window.scrollY
    const body = document.getElementsByTagName('body')[0]
    body.style.overflow = 'hidden'
    body.style.top = `-${scrollY}px`

    return () => {
      // Restore window scroll
      body.style.overflow = ''
      body.style.top = ''
      window.scrollTo(0, scrollY)
    }
  }, [])
}
