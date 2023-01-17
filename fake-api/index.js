const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(router)
server.listen(3000, () => {
  console.log('\x1b[32mFor mock data thanks to https://dummyjson.com/\n');
  console.log('JSON Server is running')
})