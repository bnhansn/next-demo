import React from 'react'
import Head from 'next/head'
import axios from 'axios'
import ChannelVideos from '../../components/ChannelVideos'

export default function Channel({ channel }) {
  return (
    <>
      {channel && (
        <Head>
          <title>{channel.name}</title>
        </Head>
      )}
    </>
  )
}

Channel.getLayout = (page) => {
  return <ChannelVideos {...page.props}>{page}</ChannelVideos>
}

export async function getServerSideProps(context) {
  const { username } = context.params
  let channel = null
  try {
    const response = await axios.get(`/api/users/${username}`)
    channel = response.data
  } catch (error) {}
  return {
    props: {
      channel: channel
    }
  }
}
