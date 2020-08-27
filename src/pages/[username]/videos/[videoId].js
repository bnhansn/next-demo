import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import axios from 'axios'
import ChannelVideos from '../../../components/ChannelVideos'
import VideoModal from '../../../components/VideoModal'

export default function ChannelVideo({ video }) {
  const router = useRouter()
  const { username } = router.query

  return (
    <>
      {video && (
        <Head>
          <title>{video.caption || 'Firework'}</title>
        </Head>
      )}
      <VideoModal video={video} backPath={['/[username]', `/${username}`]} />
    </>
  )
}

ChannelVideo.getLayout = (page) => {
  return <ChannelVideos {...page.props}>{page}</ChannelVideos>
}

export async function getServerSideProps(context) {
  const { username, videoId } = context.params
  let channel = null
  let video = null
  try {
    const [channelResponse, videoResponse] = await Promise.all([
      axios.get(`/api/users/${username}`),
      axios.get(`/api/videos/${videoId}`)
    ])
    channel = channelResponse.data
    video = videoResponse.data
  } catch (error) {}
  return {
    props: {
      channel: channel,
      video: video
    }
  }
}
