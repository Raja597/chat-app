const redis = require('redis')
const util = require('util')
const client = redis.createClient('redis://127.0.0.1:6379')
client.get = util.promisify(client.get)
client.set('raja','oknow',async(ok)=>{

    console.log('done')
    result = await client.get('raja')
    console.log(result)
})
console.log('end of redis file')
// const redisServer = require('redis-server')
// // const server = new redisServer(6379)
// const server = new redisServer({
//     port: 6379,
//     bin: '/usr/local/bin/redis-server'
//   });
// server.open((err)=>{
//     console.log(err)
//     console.log('one')

// })
