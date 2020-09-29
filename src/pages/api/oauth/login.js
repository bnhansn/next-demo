import { withServerSession } from '../../../utils/session'

export default withServerSession(async (req, res) => {
  try {
    const { username } = await JSON.parse(req.body)
    if (username) {
      req.session.set('user', { username })
      await req.session.save()
      res.statusCode = 201
    }
    res.json({})
  } catch (error) {
    res.statusCode = 500
    res.json({ message: error.message || 'Internal server error' })
  }
})
