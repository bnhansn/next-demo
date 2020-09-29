import { withServerSession } from '../../utils/session'

export default withServerSession((req, res) => {
  req.session.destroy()
  res.writeHead(302, { Location: '/' })
  res.end()
})
