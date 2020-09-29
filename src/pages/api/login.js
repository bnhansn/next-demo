import { withServerSession } from '../../utils/session'

export default withServerSession(async (req, res) => {
  try {
    const { username } = req.query
    console.log('username', username)
    if (username) {
      req.session.set('user', { username })
      await req.session.save()
    }
    res.writeHead(302, { Location: '/' })
    res.end()
  } catch (error) {
    res.statusCode = 500
    res.json({ message: error.message || 'Internal server error' })
  }
})
