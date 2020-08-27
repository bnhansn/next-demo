import React from 'react'
import axios from 'axios'

export const config = { amp: true }

export default function AMPVideo({ video }) {
  if (video) {
    return (
      <>
        <div style={{ width: 400, height: 600, margin: 'auto' }}>
          <amp-video
            id={`video-${video.encoded_id}`}
            class="amp-video-container"
            width={video.width}
            height={video.height}
            layout="responsive"
            poster={video.thumbnail_url}
            artist={video.creator.username}
            title={video.caption}
            album="firework.tv"
            autoplay
            loop
          >
            <source src={video.file_url} type="video/mp4" />
          </amp-video>
        </div>
      </>
    )
  }
  return null
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
