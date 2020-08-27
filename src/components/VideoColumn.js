import React from 'react'
import Link from 'next/link'
import { Box, Text, Flex } from 'fwego'

export default function VideoColumn({ video, getVideoLinkProps }) {
  return (
    <Box>
      <Link {...getVideoLinkProps(video.encoded_id)}>
        <a>
          <Box
            as="img"
            height="450"
            width="100%"
            objectFit="cover"
            mb="small"
            borderRadius="8"
            src={video.thumbnail_url}
          />
        </a>
      </Link>
      <Link href="/[username]" as={`/${video.creator.username}`}>
        <a>
          <Flex alignItems="center" mb="xxsmall">
            <Box
              as="img"
              borderRadius="50%"
              width="30"
              height="30"
              src={video.creator.avatar_url}
              mr="small"
            />
            <Text>{video.creator.username}</Text>
          </Flex>
        </a>
      </Link>
      <Text>{video.caption}</Text>
    </Box>
  )
}
