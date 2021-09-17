import assert from 'assert'
import * as Y from 'yjs'
import WebSocket from 'ws'
import { Hocuspocus } from '../../packages/server/src'
import { Redis } from '../../packages/redis/src'
import { HocuspocusProvider } from '../../packages/provider/src'
import flushRedis from '../utils/flushRedis'

const ydoc = new Y.Doc()
const anotherYdoc = new Y.Doc()
const server = new Hocuspocus()

context('redis/onCreateDocument', () => {
  before(() => {
    flushRedis()

    server.configure({
      port: 4000,
      extensions: [
        new Redis({
          host: process.env.REDIS_HOST || '127.0.0.1',
          port: process.env.REDIS_PORT || 6379,
        }),
      ],
    }).listen()
  })

  after(() => {
    server.destroy()

    flushRedis()
  })

  it('document is persisted', done => {
    const client = new HocuspocusProvider({
      url: 'ws://127.0.0.1:4000',
      name: 'hocuspocus-test',
      document: ydoc,
      WebSocketPolyfill: WebSocket,
      maxAttempts: 1,
      broadcast: false,
      // foo.0 = 'bar'
      onSynced: () => {
        const valueBefore = ydoc.getArray('foo').get(0)
        assert.strictEqual(valueBefore, undefined)

        ydoc.getArray('foo').insert(0, ['bar'])

        client.destroy()
        done()
      },
    })
  })

  it('document can be restored', done => {
    const client = new HocuspocusProvider({
      url: 'ws://127.0.0.1:4000',
      name: 'hocuspocus-test',
      document: anotherYdoc,
      WebSocketPolyfill: WebSocket,
      maxAttempts: 1,
      // foo.0 === 'bar'
      onSynced: () => {
        const value = anotherYdoc.getArray('foo').get(0)
        assert.strictEqual(value, 'bar')

        client.destroy()
        done()
      },
    })
  })
})
