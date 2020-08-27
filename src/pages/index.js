import React from 'react'
import axios from 'axios'
import Head from 'next/head'
import ChannelVideos from '../components/ChannelVideos'

export default function Home({ channel }) {
  if (channel) {
    return (
      <Head>
        <title>{channel.name}</title>
      </Head>
    )
  }
  return <h1>Welcome Home</h1>
}

Home.getLayout = (page) => {
  const { channel, username } = page.props
  if (channel && username) {
    return <ChannelVideos {...page.props}>{page}</ChannelVideos>
  }
  return page
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
