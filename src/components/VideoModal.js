import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Box, Modal, ModalContent } from 'fwego'
import axios from '../utils/axios'
import useScrollFreeze from '../hooks/useScrollFreeze'

export default function VideoModal({ video: ssrVideo, backPath }) {
  useScrollFreeze()
  const [clientFetchedVideo, setClientFetchedVideo] = useState()
  const router = useRouter()
  const { videoId } = router.query
  const video = ssrVideo || clientFetchedVideo

  useEffect(() => {
    if (videoId && !ssrVideo) {
      axios
        .get(`/api/videos/${videoId}`)
        .then((response) => {
          setClientFetchedVideo(response.data)
        })
        .catch(() => {})
    }
  }, [videoId, ssrVideo])

  return (
    <Modal
      onDismiss={() => {
        Array.isArray(backPath)
          ? router.push(...backPath)
          : router.push(backPath)
      }}
    >
      <ModalContent
        aria-label="video"
        width="373"
        height="664"
        borderRadius="8"
        overflow="hidden"
      >
        {video && (
          <Box
            controls
            as="video"
            src={video.file_url}
            poster={video.thumbnail_url}
            width="100%"
            height="100%"
            objectFit="cover"
          />
        )}
      </ModalContent>
    </Modal>
  )
}
