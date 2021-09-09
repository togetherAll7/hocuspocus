# hocuspocus (Alpha Preview!)
A plug & play collaboration backend based on [Y.js](https://github.com/yjs/yjs).

[![Build Status](https://github.com/ueberdosis/hocuspocus/workflows/build/badge.svg)](https://github.com/ueberdosis/hocuspocus/actions)
[![Version](https://img.shields.io/npm/v/@hocuspocus/server.svg?label=version)](https://www.npmjs.com/package/@hocuspocus/server)
[![Downloads](https://img.shields.io/npm/dm/@hocuspocus/server.svg)](https://npmcharts.com/compare/@hocuspocus/server?minimal=true)
[![License](https://img.shields.io/npm/l/@hocuspocus/server.svg)](https://www.npmjs.com/package/@hocuspocus/server)
[![Chat](https://img.shields.io/badge/chat-on%20discord-7289da.svg?sanitize=true)](https://discord.gg/WtJ49jGshW)
[![Sponsor](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub)](https://github.com/sponsors/ueberdosis)

## Documentation
The full documentation is a available on [hocuspocus.dev/introduction](https://www.hocuspocus.dev/introduction).

## Feedback
Send all your questions, feedback and bug reports to [humans@hocuspocus.dev](mailto:humans@hocuspocus.dev) or [create an issue](https://github.com/ueberdosis/hocuspocus/issues/new/choose) here.

## Usage
The following example is a example setup you need to start a WebSocket server. By default, it’s listening on [http://127.0.0.1](http://127.0.0.1) (or prefixed with the WebSocket protocol on ws://127.0.0.1):

```js
import { Server } from '@hocuspocus/server'
import { RocksDB } from '@hocuspocus/extension-rocksdb'

const server = Server.configure({
  port: 80,

  async onConnect() {
    console.log('🔮')
  },

  extensions: [
    new RocksDB({
      path: './database',
    }),
  ],
})

server.listen()
```

## Community
For help, discussion about best practices, or any other conversation:

[Join the tiptap Discord Server](https://discord.gg/WtJ49jGshW)

## Sponsors 💖
<table>
  <tr>
    <td align="center">
      <a href="https://ueberdosis.io/">
        <img src="https://unavatar.io/ueberdosis.io" width="100"><br>
        <strong>überdosis</strong>
      </a>
    </td>
    <td align="center">
      <a href="https://cargo.site/">
        <img src="https://unavatar.io/github/cargo" width="100"><br>
        <strong>Cargo</strong>
      </a>
    </td>
    <td align="center">
      <a href="https://saga.so/">
        <img src="https://unavatar.io/saga.so" width="100"><br>
        <strong>Saga</strong>
      </a>
    </td>    
    <td align="center">
      <a href="https://www.gamma.app/">
        <img src="https://unavatar.io/gamma.app" width="100"><br>
        <strong>Gamma</strong>
      </a>
    </td>    
    <td align="center">
      <a href="https://www.cosmicmind.com/">
        <img src="https://unavatar.io/github/cosmicmind" width="100"><br>
        <strong>CosmicMind</strong>
      </a>
    </td>
    <td align="center">
      <a href="https://www.getoutline.com/">
        <img src="https://unavatar.io/github/outline" width="100"><br>
        <strong>Outline</strong>
      </a>
    </td> 
    <td align="center">
      <a href="https://ahrefs.com/">
        <img src="https://unavatar.io/ahrefs.com" width="100"><br>
        <strong>Ahrefs</strong>
      </a>
    </td>     
  </tr>
</table>

… and hundreds of awesome inviduals.

Using hocuspocus in production? Invest in the future of hocuspocus and [become a sponsor!](https://github.com/sponsors/ueberdosis)

## Contributing
Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

## Contributors
[All contributors](../../contributors).

## License
The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
