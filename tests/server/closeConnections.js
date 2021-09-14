import assert from 'assert'
import * as Y from 'yjs'
import WebSocket from 'ws'
import { Hocuspocus } from '../../packages/server/src'
import { HocuspocusProvider } from '../../packages/provider/src'

let client
let anotherClient
const ydoc = new Y.Doc()
const ydoc2 = new Y.Doc()

context('server/closeConnections', () => {
  it('closes a specific connection when a documentName is passed', done => {
    const Server = new Hocuspocus()

    Server.configure({
      port: 4000,
    }).listen()

    const clientDonePromise = new Promise(resolve => {
      client = new HocuspocusProvider({
        url: 'ws://127.0.0.1:4000',
        name: 'hocuspocus-test',
        document: ydoc,
        WebSocketPolyfill: WebSocket,
        maxAttempts: 1,
        onSynced() {
          Server.closeConnections('hocuspocus-test')
        },
        onClose() {
          // Make the sure client doesn’t reconnect
          client.disconnect()
          resolve()
        },
      })
    })

    const anotherClientDonePromise = new Promise(resolve => {
      anotherClient = new HocuspocusProvider({
        url: 'ws://127.0.0.1:4000',
        name: 'hocuspocus-test-2',
        document: ydoc2,
        WebSocketPolyfill: WebSocket,
        maxAttempts: 1,
        onSynced() {
          resolve()
        },
      })
    })

    // Wait for the disconnected client to close and the second
    // connection to sync before proceeding to assert
    Promise.all([clientDonePromise, anotherClientDonePromise]).then(() => {
      assert.strictEqual(client.status, 'disconnected')
      assert.strictEqual(anotherClient.status, 'connected')

      client.destroy()
      anotherClient.destroy()
      Server.destroy()
      done()
    })
  })

  it('closes all connections when no documentName is passed', done => {
    const Server = new Hocuspocus()

    Server.configure({
      port: 4000,
    }).listen()

    const clientDonePromise = new Promise(resolve => {
      client = new HocuspocusProvider({
        url: 'ws://127.0.0.1:4000',
        name: 'hocuspocus-test',
        document: ydoc,
        WebSocketPolyfill: WebSocket,
        maxAttempts: 1,
        onClose() {
          // Make the sure client doesn’t reconnect
          client.disconnect()
          resolve()
        },
      })
    })

    const anotherClientDonePromise = new Promise(resolve => {
      anotherClient = new HocuspocusProvider({
        url: 'ws://127.0.0.1:4000',
        name: 'hocuspocus-test-2',
        document: ydoc2,
        WebSocketPolyfill: WebSocket,
        maxAttempts: 1,
        onSynced() {
          Server.closeConnections()
        },
        onClose() {
          // Make the sure client doesn’t reconnect
          anotherClient.disconnect()
          resolve()
        },
      })
    })

    // Wait for both clients to disconnect before asserting
    Promise.all([clientDonePromise, anotherClientDonePromise]).then(() => {
      assert.strictEqual(client.status, 'disconnected')
      assert.strictEqual(anotherClient.status, 'disconnected')

      client.destroy()
      anotherClient.destroy()
      Server.destroy()
      done()
    })
  })

  it('uses a proper close event', done => {
    const Server = new Hocuspocus()

    Server.configure({
      port: 4000,
    }).listen()

    const client = new HocuspocusProvider({
      url: 'ws://127.0.0.1:4000',
      name: 'hocuspocus-test',
      document: ydoc,
      WebSocketPolyfill: WebSocket,
      maxAttempts: 1,
      onSynced() {
        Server.closeConnections()
      },
      onClose({ event }) {
        assert.strictEqual(event.code, 4205)
        assert.strictEqual(event.reason, 'Reset Connection')

        client.destroy()
        Server.destroy()
        done()
      },
    })
  })
})
