import React from 'react'
import DiscoverVideos from '../../components/DiscoverVideos'

export default function Discover() {
  return null
}

Discover.getLayout = (page) => {
  return <DiscoverVideos>{page}</DiscoverVideos>
}
