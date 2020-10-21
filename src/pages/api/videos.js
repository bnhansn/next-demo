import axios from 'axios'

export default async (req, res) => {
  try {
    const response = await axios.get(
      'https://fireworktv.com/api/suggested_videos'
    )
    res.json(response.data)
  } catch (error) {
    res.statusCode = 500
    res.json({ message: error.message || 'Internal server error' })
  }
}
