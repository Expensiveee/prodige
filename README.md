<div align="center">
  <p>
    <br />
    <a href="https://www.npmjs.com/package/prodige"><img src="https://img.shields.io/npm/v/prodige.svg?maxAge=3600" alt="NPM version" /></a>
    <a href="https://www.npmjs.com/package/prodige"><img src="https://img.shields.io/npm/dt/prodige.svg?maxAge=3600" alt="NPM downloads" /></a>    
    <br />
    <a href='https://nodei.co/npm/prodige/' target='_blank'><img src="https://nodei.co/npm/prodige.png" alt="NPM" /></a>
    <br />
  </p>
</div>

# Prodige

_**Prodige, get straight to it**_

Prodige is one of the most advanced command/event handler for discord.js. It has a lot of features such as aliases, cooldowns, channel only commands, permissions only commands, roles only commands... But the most important thing: argument handling. Prodige has an integrated argument handler system that allows you to be sure that your arguments will as you expect them to be.Prodige also has precise and explicit error messages.

# Installation

Node.js 14.0.0 or newer is required.

```
$ npm install prodige
```

# Example usage

index.js

```js
const { Prodige } = require('prodige');
const { Intents } = require('discord.js');

const client = new Prodige({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
}).start({
  token: 'token',
  prefix: '-',
  delErrorMessage: -1,
  sendErrorMessages: true,
});
```

# Links

- [Discord Server](https://discord.gg/es2CtXymWP)
- [Documentation](https://theexpensiveee.gitbook.io/prodige)
- [Github](https://github.com/Expensiveee/prodige)
- [NPM](https://npmjs.com/package/prodige)

# Get help

Having troubles with the documentation? Join our [discord server](https://discord.gg/es2CtXymWP) to get help.
