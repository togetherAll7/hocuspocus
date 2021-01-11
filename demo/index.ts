/* eslint-disable */
import {
  Server,
  onConnectPayload,
  onChangePayload,
  onDisconnectPayload,
} from '@hocuspocus/server/src'
import { LevelDB } from '@hocuspocus/leveldb/src/index'
// import { Redis } from '@hocuspocus/redis'

const server = Server.configure({

  port: 1234,
  debounce: 2000, // numeric or true/false
  debounceMaxWait: 10000,

  persistence: new LevelDB({
    path: './database',
  }),

  // persistence: new Redis({
  //   port: 6379,
  //   host: '127.0.0.1',
  // }),
  // persistence: new Redis({
  //   port: 6379,
  //   host: '127.0.0.1',
  // }, {
  //    // Redis Cluster Options
  // ),

  onConnect(data: onConnectPayload, resolve: Function, reject: Function) {
    // authenticate using request headers
    // if (data.requestHeaders.access_token === 'super-secret-token') {
    //   return reject()
    // }

    // set context for later usage
    const context = { user_id: 1234 }

    // authorize user
    // if (context.user_id !== 1234) {
    //   return reject()
    // }

    console.log(`User ${context.user_id} connected to ${data.documentName}`)

    resolve()
  },

  onChange(data: onChangePayload) {
    // do something with the data
    console.log(`${data.documentName} was sent to an API!`)
  },

  onDisconnect(data: onDisconnectPayload) {
    // handle disconnect
    console.log(`User ${data.context.user_id} disconnected from ${data.documentName}`)
  },
})

server.listen()
