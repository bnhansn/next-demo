import axios from 'axios'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const token =
  process.env.NODE_ENV === 'production'
    ? publicRuntimeConfig.prodToken
    : publicRuntimeConfig.devToken

axios.defaults.baseURL = publicRuntimeConfig.apiHost
axios.defaults.headers.common.Accept = 'application/json'
axios.defaults.headers.common.Authorization = `Bearer ${token}`
axios.defaults.headers.common['Content-Type'] = 'application/json'
