import React, { useEffect, useState } from 'react'
import uniqBy from 'lodash/uniqBy'
import axios from 'axios'
import VideoGrid from './VideoGrid'

export default function DiscoverVideos({ children }) {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState({})

  useEffect(() => {
    async function fetchVideos() {
      try {
        setLoading(true)
        const response = await axios.get('/api/suggested_videos')
        setVideos(response.data.videos)
      } catch (error) {
      } finally {
        setLoading(false)
      }
    }
    fetchVideos()
  }, [])

  async function onFetchPage() {
    try {
      setLoading(true)
      const excludeIds = videos.map((v) => v.encoded_id)
      const response = await axios.get('/api/suggested_videos', {
        params: { exclude_ids: excludeIds }
      })
      setVideos(
        uniqBy([...videos, ...response.data.videos], (v) => v.encoded_id)
      )
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <VideoGrid
        videos={videos}
        paging={{ next: true }}
        loading={loading}
        onFetchPage={onFetchPage}
        getVideoLinkProps={(videoId) => ({
          href: '/discover/[videoId]',
          as: `/discover/${videoId}`
        })}
      />
      {children}
    </>
  )
}
