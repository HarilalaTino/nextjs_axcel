import { createServer } from 'http'
import next from 'next'

const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => handle(req, res)).listen(process.env.PORT, () => {
    console.log('Ready on port', process.env.PORT)
  })
})