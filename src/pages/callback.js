import { useEffect } from 'react'
import qs from 'query-string'
import { useRouter } from 'next/router'

const defaultRedirectPath = '/'

function toObject(qstring, options = {}) {
  return qs.parse(qstring, { ignoreQueryPrefix: true, ...options })
}

export default function OAuthCallback() {
  const router = useRouter()
  const locationQuery =
    typeof window !== 'undefined' && toObject(window.location.search)
  const queryState =
    typeof window !== 'undefined' && toObject(atob(locationQuery.state || ''))
  const redirectDomain =
    typeof window !== 'undefined' &&
    decodeURIComponent(queryState.redirect_domain || '')
  const redirectTo =
    typeof window !== 'undefined' &&
    (decodeURIComponent(queryState.redirect_to || '') || defaultRedirectPath)

  useEffect(() => {
    function doRedirectWithDomain(path) {
      if (redirectDomain) {
        router.replace(redirectDomain + path)
      } else {
        router.replace(path)
      }
    }

    async function completeLogin() {
      try {
        await fetch('/api/oauth/login', {
          method: 'POST',
          body: JSON.stringify({ username: 'oauth user' })
        })
      } catch (error) {
      } finally {
        doRedirectWithDomain(redirectTo)
      }
    }

    completeLogin()
  }, [])

  return null
}
