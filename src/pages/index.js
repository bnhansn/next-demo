import React from 'react'
import axios from 'axios'
import Head from 'next/head'
import getConfig from 'next/config'
import { withServerSession } from '../utils/session'
import ChannelVideos from '../components/ChannelVideos'

const { publicRuntimeConfig } = getConfig()

export default function Home({ channel, currentUser }) {
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
