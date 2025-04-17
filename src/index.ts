import server from './server'
import picocolors from 'picocolors'

const PORT = process.env.PORT ?? 3000

server.listen(PORT, () => {
  console.log(picocolors.blueBright(`Server listening on port ${PORT}`))
})
