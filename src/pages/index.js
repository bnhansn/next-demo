import React from 'react'
import axios from 'axios'
import ChannelVideos from '../components/ChannelVideos'

export default function Home({ username, channel }) {
  if (username && channel) {
    return <ChannelVideos username={username} channel={channel} />
  }
  return <h1>Welcome Home</h1>
}

export async function getServerSideProps(context) {
  const host = context.req.headers.host
  const subdomainMatches = host.match(/([^.]+)\.[\s\S]+\.[\s\S]+/)
  const username = subdomainMatches && subdomainMatches[1]
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
      channel: channel
    }
  }
}
