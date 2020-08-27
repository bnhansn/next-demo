import { useRef, useEffect } from 'react'
import debounce from 'lodash/debounce'

const isBrowser = typeof window !== 'undefined'

function getScrollPosition() {
  if (!isBrowser) {
    return { x: 0, y: 0, offset: { top: 0, bottom: 0 } }
  }

  const position = document.body.getBoundingClientRect()

  return {
    x: position.left,
    y: position.top,
    offset: {
      top: window.scrollY,
      bottom: document.body.scrollHeight - window.innerHeight - window.scrollY
    }
  }
}

export default function useScrollPosition(effect, debounceTime) {
  const position = useRef(getScrollPosition)

  useEffect(() => {
    if (!isBrowser) {
      return
    }

    function onScroll() {
      const currentPos = getScrollPosition()
      effect({ prevPos: position.current, currPos: currentPos })
      position.current = currentPos
    }

    let scrollCallback = onScroll
    if (debounceTime) {
      scrollCallback = debounce(onScroll, debounceTime)
    }

    window.addEventListener('scroll', scrollCallback)
    return () => {
      window.removeEventListener('scroll', scrollCallback)
    }
  }, [effect, debounceTime])
}
