import React from 'react'
import Head from 'next/head'
import axios from '../../utils/axios'
import DiscoverVideos from '../../components/DiscoverVideos'
import VideoModal from '../../components/VideoModal'

export default function DiscoverVideo({ video }) {
  return (
    <>
      {video && (
        <Head>
          <title>{video.caption || 'Firework'}</title>
        </Head>
      )}
      <VideoModal video={video} backPath="/discover" />
    </>
  )
}

DiscoverVideo.getLayout = (page) => {
  return <DiscoverVideos>{page}</DiscoverVideos>
}

export async function getServerSideProps(context) {
  const { videoId } = context.params
  let video = null
  try {
    const response = await axios.get(`/api/videos/${videoId}`)
    video = response.data
  } catch (error) {}
  return {
    props: {
      video: video
    }
  }
}
