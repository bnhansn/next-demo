import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { Box, Modal, ModalContent } from 'fwego'
import axios from 'axios'
import useScrollFreeze from '../hooks/useScrollFreeze'

export default function VideoModal({ video: ssrVideo, backPath }) {
  useScrollFreeze()
  const [clientFetchedVideo, setClientFetchedVideo] = useState()
  const router = useRouter()
  const { videoId } = router.query
  const video = ssrVideo || clientFetchedVideo
  const requestPendingRef = useRef(false)

  useEffect(() => {
    const source = axios.CancelToken.source()

    if (videoId && !ssrVideo) {
      requestPendingRef.current = true
      axios
        .get(`/api/videos/${videoId}`, { cancelToken: source.token })
        .then((response) => {
          setClientFetchedVideo(response.data)
        })
        .catch(() => {})
        .finally(() => {
          requestPendingRef.current = false
        })
    }

    return () => {
      if (requestPendingRef.current) {
        source.cancel()
      }
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
