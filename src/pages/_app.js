import React from 'react'
import Head from 'next/head'
import '../utils/axios'
import '../../styles/global.css'

export default function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <>
      <Head>
        <title>Firework</title>
      </Head>
      {getLayout(<Component {...pageProps} />)}
    </>
  )
}
