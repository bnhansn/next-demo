import axios from 'axios'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const token =
  process.env.NODE_ENV === 'production'
    ? publicRuntimeConfig.prodToken
    : publicRuntimeConfig.devToken

const apiHost = publicRuntimeConfig.apiHost

export default axios.create({
  baseURL: apiHost,
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})
