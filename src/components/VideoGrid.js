import React from 'react'
import { Box } from 'fwego'
import useScrollPosition from '../hooks/useScrollPosition'
import VideoColumn from './VideoColumn'

export default function VideoGrid({
  videos,
  paging,
  loading,
  onFetchPage,
  getVideoLinkProps
}) {
  useScrollPosition(({ currPos }) => {
    if (currPos.offset.bottom < 500 && paging?.next && !loading) {
      onFetchPage()
    }
  }, 300)

  return (
    <Box
      display="grid"
      gridTemplateColumns={['repeat(3, 1fr)']}
      columnGap="medium"
      rowGap="medium"
      width="880"
      mx="auto"
      my="medium"
    >
      {videos.map((video) => (
        <VideoColumn
          key={video.id}
          video={video}
          getVideoLinkProps={getVideoLinkProps}
        />
      ))}
    </Box>
  )
}
