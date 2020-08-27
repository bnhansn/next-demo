import db from '../../../utils/db'

export default async function getUser(req, res) {
  const { username } = req.query

  try {
    const query = `SELECT * FROM users WHERE username = '${username}'`
    const data = await db.any(query)
    const user = data[0]

    if (user) {
      res.status(200).json(user)
    } else {
      res.status(404).json({ message: 'Not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}
