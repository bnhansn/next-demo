import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Box, Flex, Heading } from 'fwego'
import axios from 'axios'
import VideoGrid from './VideoGrid'

export default function ChannelVideos({
  children,
  channel,
  username: usernameFromSubdomain
}) {
  const [videos, setVideos] = useState([])
  const [paging, setPaging] = useState({})
  const [loading, setLoading] = useState({})
  const router = useRouter()
  const { username: usernameFromQueryPath } = router.query
  const username = usernameFromSubdomain || usernameFromQueryPath

  useEffect(() => {
    async function fetchVideos() {
      try {
        setLoading(true)
        const response = await axios.get(`/api/users/${username}/videos`)
        setVideos(response.data.videos)
        setPaging(response.data.paging)
      } catch (error) {
      } finally {
        setLoading(false)
      }
    }
    if (username) {
      fetchVideos()
    }
  }, [username])

  async function onFetchPage() {
    try {
      setLoading(true)
      const response = await axios.get(paging.next)
      setVideos([...videos, ...response.data.videos])
      setPaging(response.data.paging)
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {channel && (
        <Flex alignItems="center" justifyContent="center" my="large">
          <Box
            as="img"
            src={channel.avatar_url}
            width="50"
            height="50"
            borderRadius="50%"
            mr="large"
          />
          <Heading level="1">{channel.name}</Heading>
        </Flex>
      )}
      <VideoGrid
        videos={videos}
        paging={paging}
        loading={loading}
        onFetchPage={onFetchPage}
        getVideoLinkProps={(videoId) => ({
          href: '/[username]/videos/[videoId]',
          as: `/${username}/videos/${videoId}`
        })}
      />
      {children}
    </>
  )
}
