import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Head from 'next/head'
import getConfig from 'next/config'
import Link from 'next/link'
import { withServerSession } from '../utils/session'
import ChannelVideos from '../components/ChannelVideos'

const { publicRuntimeConfig } = getConfig()
const { oauthHost, oauthClientId, domain } = publicRuntimeConfig

const OAUTH_URL = `${oauthHost}/oauth2/auth?client_id=${oauthClientId}&response_type=token`

export default function Home({ channel, currentUser }) {
  const [oauthUrl, setOAuthUrl] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const origin = domain ? `https://${domain}` : window.location.origin
      const redirectURI = origin + '/callback'
      let url = OAUTH_URL + `&redirect_uri=${redirectURI}`
      const subdomainMatches = window.location.origin.match(
        /https:\/\/([^.]+)\.[\s\S]+\.[\s\S]+/
      )
      const subdomain = subdomainMatches && subdomainMatches[1]
      if (subdomain) {
        const redirectToDomain = encodeURIComponent(window.location.origin)
        const state = btoa('redirect_domain=' + redirectToDomain)
        url += `&state=${state}`
      }
      setOAuthUrl(url)
    }
  }, [])

  if (channel) {
    return (
      <Head>
        <title>{channel.name}</title>
      </Head>
    )
  }

  return (
    <div>
      <h1>Welcome Home</h1>
      <div>Vercel url: {publicRuntimeConfig.vercelUrl}</div>
      <div>Current user: {currentUser && JSON.stringify(currentUser)}</div>
      <div>
        <a href={oauthUrl}>OAuth Login Link</a>
      </div>
      <div>
        <Link href="/api/logout">
          <a>Logout</a>
        </Link>
      </div>
    </div>
  )
}

Home.getLayout = (page) => {
  const { channel, username } = page.props
  if (channel && username) {
    return <ChannelVideos {...page.props}>{page}</ChannelVideos>
  }
  return page
}

function getUsernameFromSubdomain(req) {
  const host = req.headers.host
  const subdomainMatches = host.match(/([^.]+)\.[\s\S]+\.[\s\S]+/)
  const username = subdomainMatches && subdomainMatches[1]
  return username
}

export const getServerSideProps = withServerSession(async ({ req }) => {
  const username = getUsernameFromSubdomain(req)
  const currentUser = req.session.get('user') || null
  let channel = null
  if (username) {
    try {
      const response = await axios.get(`/api/users/${username}`)
      channel = response.data
    } catch (error) {}
  }
  return {
    props: {
      username: username,
      channel: channel,
      currentUser: currentUser
    }
  }
})
